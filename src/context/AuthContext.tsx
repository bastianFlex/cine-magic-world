
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('cinemark-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('cinemark-user');
      }
    }
  }, []);

  // Mock login function (would connect to backend in real app)
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Mock API call - in a real app, this would be an actual API request
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Demo credentials (in real app this would be validated server-side)
      if (email === 'demo@example.com' && password === 'password') {
        const userData = { id: '1', name: 'Demo User', email };
        setUser(userData);
        localStorage.setItem('cinemark-user', JSON.stringify(userData));
        
        toast({
          title: "Success",
          description: "Logged in successfully"
        });
        return true;
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Authentication failed",
        variant: "destructive"
      });
      return false;
    }
  };

  // Mock registration function (would connect to backend in real app)
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simple validation
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Mock API call - in a real app, this would be an actual API request
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userData = { id: Date.now().toString(), name, email };
      setUser(userData);
      localStorage.setItem('cinemark-user', JSON.stringify(userData));
      
      toast({
        title: "Success",
        description: "Account created successfully"
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: "Registration failed",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cinemark-user');
    toast({
      title: "Success",
      description: "Logged out successfully"
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
