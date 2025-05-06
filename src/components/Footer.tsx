
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cinema-secondary text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Ticket className="h-6 w-6 text-cinema-primary mr-2" />
              <span className="text-lg font-bold">CineMagic</span>
            </div>
            <p className="text-sm text-gray-400">
              Your premier destination for the ultimate movie experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-cinema-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/movies" className="text-sm text-gray-400 hover:text-white transition">Movies</Link>
              </li>
              <li>
                <Link to="/theaters" className="text-sm text-gray-400 hover:text-white transition">Theaters</Link>
              </li>
              <li>
                <Link to="/concessions" className="text-sm text-gray-400 hover:text-white transition">Concessions</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-span-1">
            <h3 className="font-semibold text-cinema-gold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition">FAQ</Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition">Contact Us</Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h3 className="font-semibold text-cinema-gold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-cinema-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-cinema-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-cinema-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-cinema-primary transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Sign up for our newsletter to receive updates and exclusive offers.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} CineMagic. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/" className="text-xs text-gray-400 hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-white transition">
              Terms of Service
            </Link>
            <Link to="/" className="text-xs text-gray-400 hover:text-white transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
