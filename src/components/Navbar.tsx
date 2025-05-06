
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { Film, User, Calendar, Ticket, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Movies', path: '/movies', icon: <Film className="mr-1 h-4 w-4" /> },
    { name: 'Theaters', path: '/theaters', icon: <Calendar className="mr-1 h-4 w-4" /> },
    { name: 'Concessions', path: '/concessions', icon: <ShoppingCart className="mr-1 h-4 w-4" /> },
  ];

  return (
    <nav className="bg-cinema-secondary text-white py-4 px-4 md:px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Ticket className="h-8 w-8 text-cinema-primary mr-2" />
          <span className="text-xl font-bold text-white">CineMagic</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className="flex items-center text-sm hover:text-cinema-primary transition-colors"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          <div className="ml-4 flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <div className="text-sm mr-4">
                  <span className="text-gray-400">Hello, </span>
                  <span className="text-cinema-gold">{user?.name.split(' ')[0]}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-white border-cinema-gold hover:bg-cinema-gold hover:text-cinema-secondary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-white border-white hover:bg-white/10"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-cinema-primary hover:bg-cinema-primary/90"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-50 bg-cinema-secondary shadow-lg p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center text-sm py-2 px-3 hover:bg-black/20 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <div className="py-2 px-3">
                  <span className="text-gray-400">Hello, </span>
                  <span className="text-cinema-gold">{user?.name.split(' ')[0]}</span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="w-full text-white border-cinema-gold hover:bg-cinema-gold hover:text-cinema-secondary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-white border-white hover:bg-white/10"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-cinema-primary hover:bg-cinema-primary/90"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
