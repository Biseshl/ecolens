-- Create leaf point transactions table to track earning history
CREATE TABLE public.leaf_point_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  points_earned integer NOT NULL DEFAULT 1,
  action_type text NOT NULL,
  item_id text,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leaf_point_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own transactions" 
ON public.leaf_point_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" 
ON public.leaf_point_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_leaf_point_transactions_user_id ON public.leaf_point_transactions(user_id);
CREATE INDEX idx_leaf_point_transactions_created_at ON public.leaf_point_transactions(created_at DESC);