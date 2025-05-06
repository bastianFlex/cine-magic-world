
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const success = await login('demo@example.com', 'password');
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="bg-cinema-secondary border-gray-800">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="youremail@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-cinema-dark border-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/" className="text-xs text-cinema-gold hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-cinema-dark border-gray-800"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="data-[state=checked]:bg-cinema-primary data-[state=checked]:border-cinema-primary"
                  />
                  <Label 
                    htmlFor="remember"
                    className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cinema-primary hover:bg-cinema-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-cinema-secondary px-2 text-gray-400">Or</span>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full border-gray-700 hover:bg-gray-800"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  Sign in with Demo Account
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <div className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-cinema-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
