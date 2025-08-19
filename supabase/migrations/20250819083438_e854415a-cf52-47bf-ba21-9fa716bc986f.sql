-- Enable real-time replication for profiles table
ALTER TABLE public.profiles REPLICA IDENTITY FULL;

-- Enable real-time replication for leaf_point_transactions table  
ALTER TABLE public.leaf_point_transactions REPLICA IDENTITY FULL;