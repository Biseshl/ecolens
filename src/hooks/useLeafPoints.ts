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

    // Set up real-time subscription for leaf points
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          if (payload.new && user && payload.new.id === user.id) {
            setLeafPoints(payload.new.leaf_points);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
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

      if (!transactionError) {
        // Then update the total points
        const { error } = await supabase
          .from('profiles')
          .update({ leaf_points: leafPoints + 1 })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating leaf points:', error);
          toast({
            title: "Error",
            description: "Failed to update leaf points. Please try again.",
            variant: "destructive",
          });
        } else {
          // Refresh transaction history
          await getTransactionHistory();
          toast({
            title: "Leaf point earned! 🌱",
            description: description || "You've earned a leaf point for this eco-friendly action!",
          });
        }
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
    if (!savedItems.has(itemId)) {
      const newSavedItems = new Set(savedItems);
      newSavedItems.add(itemId);
      setSavedItems(newSavedItems);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(Array.from(newSavedItems)));
      addLeafPoint('item_saved', itemId, 'Saved item to wishlist');
      return true;
    }
    return false;
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