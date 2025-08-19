import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeafPointTransaction {
  id: string;
  points_earned: number;
  action_type: string;
  item_id?: string;
  description: string;
  created_at: string;
}

const LEAF_POINTS_KEY = 'ecolens-leaf-points';
const SAVED_ITEMS_KEY = 'ecolens-saved-items';

export const useLeafPoints = () => {
  const [leafPoints, setLeafPoints] = useState(0);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [transactions, setTransactions] = useState<LeafPointTransaction[]>([]);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get current user and set up auth state listener
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Fetch user's leaf points from database
        const { data: profile } = await supabase
          .from('profiles')
          .select('leaf_points')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profile) {
          setLeafPoints(profile.leaf_points);
        }
        
        // Fetch transaction history for authenticated users
        await getTransactionHistory(user);
      } else {
        // If not authenticated, fall back to localStorage
        const storedPoints = localStorage.getItem(LEAF_POINTS_KEY);
        if (storedPoints) {
          setLeafPoints(parseInt(storedPoints, 10));
        }
        setTransactions([]);
      }
      
      // Load saved items from localStorage regardless of auth status
      const storedItems = localStorage.getItem(SAVED_ITEMS_KEY);
      if (storedItems) {
        setSavedItems(new Set(JSON.parse(storedItems)));
      }
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user's leaf points when they sign in
        const { data: profile } = await supabase
          .from('profiles')
          .select('leaf_points')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (profile) {
          setLeafPoints(profile.leaf_points);
        }
        
        // Fetch transaction history for newly signed in users
        await getTransactionHistory(session.user);
      } else {
        // Fall back to localStorage when signed out
        const storedPoints = localStorage.getItem(LEAF_POINTS_KEY);
        if (storedPoints) {
          setLeafPoints(parseInt(storedPoints, 10));
        }
        setTransactions([]);
      }
    });

    // Set up real-time subscriptions only if user is authenticated
    let profileChannel: any = null;
    let transactionChannel: any = null;

    if (user?.id) {
      const currentUserId = user.id;
      
      // Set up real-time subscription for leaf points
      profileChannel = supabase
        .channel(`profile-changes-${currentUserId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles'
          },
          (payload) => {
            console.log('Profile update received:', payload);
            if (payload.new && payload.new.id === currentUserId) {
              console.log('Updating leaf points to:', payload.new.leaf_points);
              setLeafPoints(payload.new.leaf_points);
            }
          }
        )
        .subscribe();

      // Set up real-time subscription for transaction changes
      transactionChannel = supabase
        .channel(`transaction-changes-${currentUserId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'leaf_point_transactions'
          },
          (payload) => {
            console.log('Transaction insert received:', payload);
            if (payload.new && payload.new.user_id === currentUserId) {
              console.log('Adding new transaction:', payload.new);
              // Add new transaction to the beginning of the list
              setTransactions(prev => [payload.new as LeafPointTransaction, ...prev]);
            }
          }
        )
        .subscribe();
    }

    return () => {
      subscription.unsubscribe();
      if (profileChannel) {
        supabase.removeChannel(profileChannel);
      }
      if (transactionChannel) {
        supabase.removeChannel(transactionChannel);
      }
    };
  }, [user?.id]);

  const getTransactionHistory = async (currentUser?: any) => {
    const userToQuery = currentUser || user;
    if (userToQuery) {
      const { data, error } = await supabase
        .from('leaf_point_transactions')
        .select('*')
        .eq('user_id', userToQuery.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setTransactions(data);
      }
    }
  };

  const addLeafPoint = async (actionType: string = 'manual', itemId?: string, description?: string) => {
    console.log('Adding leaf point for action:', actionType, 'item:', itemId);
    
    if (user) {
      // First create the transaction record
      const { error: transactionError } = await supabase
        .from('leaf_point_transactions')
        .insert({
          user_id: user.id,
          points_earned: 1,
          action_type: actionType,
          item_id: itemId,
          description: description || `Earned 1 point for ${actionType}`
        });

      if (transactionError) {
        console.error('Error creating transaction:', transactionError);
        toast({
          title: "Error",
          description: "Failed to save transaction. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Get the current leaf points from database to ensure accuracy
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('leaf_points')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        console.error('Error fetching current leaf points:', fetchError);
        return;
      }

      // Update with the correct current total
      const newTotal = currentProfile.leaf_points + 1;
      const { error } = await supabase
        .from('profiles')
        .update({ leaf_points: newTotal })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating leaf points:', error);
        toast({
          title: "Error",
          description: "Failed to update leaf points. Please try again.",
          variant: "destructive",
        });
      } else {
        console.log('Successfully updated leaf points to:', newTotal);
        toast({
          title: "Leaf point earned! 🌱",
          description: description || "You've earned a leaf point for this eco-friendly action!",
        });
      }
    } else {
      // Fall back to localStorage for non-authenticated users
      const newPoints = leafPoints + 1;
      setLeafPoints(newPoints);
      localStorage.setItem(LEAF_POINTS_KEY, newPoints.toString());
      toast({
        title: "Leaf point earned! 🌱",
        description: "Sign in to sync your points across devices!",
      });
    }
  };

  const saveItem = (itemId: string) => {
    console.log('Attempting to save item:', itemId, 'Already saved?', savedItems.has(itemId));
    
    if (!savedItems.has(itemId)) {
      const newSavedItems = new Set(savedItems);
      newSavedItems.add(itemId);
      setSavedItems(newSavedItems);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(Array.from(newSavedItems)));
      
      console.log('Item saved successfully, adding leaf point');
      addLeafPoint('item_saved', itemId, 'Saved item to wishlist');
      return true;
    } else {
      console.log('Item already saved');
      return false;
    }
  };

  const unsaveItem = (itemId: string) => {
    if (savedItems.has(itemId)) {
      const newSavedItems = new Set(savedItems);
      newSavedItems.delete(itemId);
      setSavedItems(newSavedItems);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(Array.from(newSavedItems)));
      return true;
    }
    return false;
  };

  const isItemSaved = (itemId: string) => savedItems.has(itemId);

  return {
    leafPoints,
    savedItems: Array.from(savedItems),
    transactions,
    saveItem,
    unsaveItem,
    isItemSaved,
    addLeafPoint,
    getTransactionHistory
  };
};