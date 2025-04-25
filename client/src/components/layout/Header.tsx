import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Presentation } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
          <Presentation className="h-6 w-6" />
          <span>WorkshopHub</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : ''}`}>
            Home
          </Link>
          <Link href="/#workshops" className="font-medium hover:text-primary transition-colors">
            Workshops
          </Link>
          <Link href="/#about" className="font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/#contact" className="font-medium hover:text-primary transition-colors">
            Contact
          </Link>
          
          <div className="ml-4 flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="#login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="#register">Sign up</Link>
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              href="/" 
              className={`block py-2 font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#workshops" 
              className="block py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Workshops
            </Link>
            <Link 
              href="/#about" 
              className="block py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/#contact" 
              className="block py-2 font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
              <Button variant="outline" className="w-full" asChild>
                <Link href="#login">Log in</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="#register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
