-- Enable real-time for leaf_point_transactions table
ALTER TABLE public.leaf_point_transactions REPLICA IDENTITY FULL;

-- Add the table to the supabase_realtime publication
ALTER publication supabase_realtime ADD TABLE public.leaf_point_transactions;