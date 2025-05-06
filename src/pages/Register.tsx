
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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    if (!agreeToTerms) {
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await register(name, email, password);
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
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-cinema-dark border-gray-800"
                  />
                </div>
                
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
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (confirmPassword) validatePasswords();
                    }}
                    required
                    className="bg-cinema-dark border-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (password) validatePasswords();
                    }}
                    required
                    className="bg-cinema-dark border-gray-800"
                  />
                  {passwordError && (
                    <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                    className="data-[state=checked]:bg-cinema-primary data-[state=checked]:border-cinema-primary"
                    required
                  />
                  <Label 
                    htmlFor="terms"
                    className="text-sm text-gray-400 leading-none"
                  >
                    I agree to the{" "}
                    <Link to="/" className="text-cinema-gold hover:underline">
                      terms of service
                    </Link>
                    {" "}and{" "}
                    <Link to="/" className="text-cinema-gold hover:underline">
                      privacy policy
                    </Link>
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cinema-primary hover:bg-cinema-primary/90"
                  disabled={isLoading || !agreeToTerms}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account
                    </>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <div className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-cinema-primary hover:underline">
                  Sign in
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

export default Register;
