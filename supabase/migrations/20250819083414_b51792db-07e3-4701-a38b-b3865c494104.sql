-- Enable real-time replication for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;

-- Enable real-time replication for leaf_point_transactions table  
ALTER TABLE public.leaf_point_transactions REPLICA IDENTITY FULL;

-- Add tables to supabase_realtime publication for real-time functionality
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaf_point_transactions;