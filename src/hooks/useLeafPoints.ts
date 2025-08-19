import { useState, useEffect, useCallback } from 'react';
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

  // Fetch user data from database
  const fetchUserData = useCallback(async (userId: string) => {
    try {
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('leaf_points')
        .eq('id', userId)
        .single();

      if (profile) {
        setLeafPoints(profile.leaf_points || 0);
      }

      // Fetch transaction history
      const { data: transactionData } = await supabase
        .from('leaf_point_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (transactionData) {
        setTransactions(transactionData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        await fetchUserData(currentUser.id);
      } else {
        // For non-authenticated users, use localStorage
        const storedPoints = localStorage.getItem(LEAF_POINTS_KEY);
        if (storedPoints) {
          setLeafPoints(parseInt(storedPoints, 10));
        }
      }

      // Load saved items from localStorage
      const storedItems = localStorage.getItem(SAVED_ITEMS_KEY);
      if (storedItems) {
        setSavedItems(new Set(JSON.parse(storedItems)));
      }
    };

    initializeData();
  }, [fetchUserData]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        // User logged out, clear data
        setLeafPoints(0);
        setTransactions([]);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserData]);

  // Real-time subscriptions for authenticated users
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`user-updates-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new && typeof payload.new.leaf_points === 'number') {
            setLeafPoints(payload.new.leaf_points);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'leaf_point_transactions',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new) {
            setTransactions(prev => [payload.new as LeafPointTransaction, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addLeafPoint = async (actionType: string = 'manual', itemId?: string, description?: string) => {
    if (user) {
      try {
        // Create transaction record
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
          throw transactionError;
        }

        // Get current profile and update points
        const { data: currentProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('leaf_points')
          .eq('id', user.id)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        const newTotal = currentProfile.leaf_points + 1;
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ leaf_points: newTotal })
          .eq('id', user.id);

        if (updateError) {
          throw updateError;
        }

        // Update local state immediately
        setLeafPoints(newTotal);
        
        toast({
          title: "Leaf point earned! 🌱",
          description: description || "You've earned a leaf point for this eco-friendly action!",
        });

      } catch (error) {
        console.error('Error adding leaf point:', error);
        toast({
          title: "Error",
          description: "Failed to add leaf point. Please try again.",
          variant: "destructive",
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
    if (!savedItems.has(itemId)) {
      const newSavedItems = new Set(savedItems);
      newSavedItems.add(itemId);
      setSavedItems(newSavedItems);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(Array.from(newSavedItems)));
      
      // Add leaf point for saving item
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

  // Manual refresh function for debugging
  const refreshData = useCallback(async () => {
    if (user) {
      await fetchUserData(user.id);
    }
  }, [user, fetchUserData]);

  return {
    leafPoints,
    savedItems: Array.from(savedItems),
    transactions,
    saveItem,
    unsaveItem,
    isItemSaved,
    addLeafPoint,
    refreshData
  };
};