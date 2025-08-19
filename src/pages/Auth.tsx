import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Leaf, Mail, Lock, AlertTriangle } from 'lucide-react';
import { validateEmail, validatePassword, sanitizeInput, authRateLimiter } from '@/lib/security';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    
    // Check rate limiting
    const clientId = `${email || 'unknown'}_${Date.now().toString().slice(-8)}`;
    if (authRateLimiter.isRateLimited(clientId)) {
      const remaining = authRateLimiter.getRemainingTime(clientId);
      setIsRateLimited(true);
      setRemainingTime(remaining);
      toast({
        title: "Too many attempts",
        description: `Please wait ${remaining} minutes before trying again.`,
        variant: "destructive",
      });
      return;
    }
    
    // Validate inputs
    const sanitizedEmail = sanitizeInput(email);
    const emailValidation = validateEmail(sanitizedEmail);
    const passwordValidation = validatePassword(password);
    
    if (!emailValidation.valid) {
      setEmailError(emailValidation.message || '');
      return;
    }
    
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.message || '');
      return;
    }
    
    setLoading(true);
    authRateLimiter.recordAttempt(clientId);

    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link to complete your registration.",
      });
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    
    // Check rate limiting
    const clientId = `${email || 'unknown'}_${Date.now().toString().slice(-8)}`;
    if (authRateLimiter.isRateLimited(clientId)) {
      const remaining = authRateLimiter.getRemainingTime(clientId);
      setIsRateLimited(true);
      setRemainingTime(remaining);
      toast({
        title: "Too many attempts",
        description: `Please wait ${remaining} minutes before trying again.`,
        variant: "destructive",
      });
      return;
    }
    
    // Validate inputs
    const sanitizedEmail = sanitizeInput(email);
    const emailValidation = validateEmail(sanitizedEmail);
    
    if (!emailValidation.valid) {
      setEmailError(emailValidation.message || '');
      return;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    
    setLoading(true);
    authRateLimiter.recordAttempt(clientId);

    const { error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password,
    });

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back! 🌱",
        description: "Successfully signed in to your EcoLens account.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold">EcoLens</h1>
          </div>
          <CardTitle>Join the sustainable community</CardTitle>
        </CardHeader>
        <CardContent>
          {isRateLimited && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Too many login attempts. Please wait {remainingTime} minutes before trying again.
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="signin-email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${emailError ? 'border-red-500' : ''}`}
                      required
                      maxLength={255}
                    />
                    {emailError && (
                      <p className="text-sm text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signin-password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 ${passwordError ? 'border-red-500' : ''}`}
                      required
                      maxLength={128}
                    />
                    {passwordError && (
                      <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                    )}
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading || isRateLimited}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${emailError ? 'border-red-500' : ''}`}
                      required
                      maxLength={255}
                    />
                    {emailError && (
                      <p className="text-sm text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password (8+ chars, uppercase, lowercase, number)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 ${passwordError ? 'border-red-500' : ''}`}
                      required
                      minLength={8}
                      maxLength={128}
                    />
                    {passwordError && (
                      <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                    )}
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading || isRateLimited}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  By creating an account, you agree to sync your leaf points across devices and help track your eco-friendly journey.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;