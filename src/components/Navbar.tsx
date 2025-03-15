
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-apple",
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-1">
          <span className="text-xl font-bold tracking-tight">
            winmix<span className="text-accent">.hu</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#predictions" className="text-sm font-medium hover:text-accent transition-colors">
            Predictions
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-accent transition-colors">
            How it Works
          </a>
          <a href="#favorites" className="text-sm font-medium hover:text-accent transition-colors">
            Favorites
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 glass shadow-lg border-t border-white/10 p-4 md:hidden animate-fade-in-down">
            <nav className="flex flex-col space-y-4">
              <a href="#predictions" className="text-sm font-medium hover:text-accent transition-colors p-2">
                Predictions
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-accent transition-colors p-2">
                How it Works
              </a>
              <a href="#favorites" className="text-sm font-medium hover:text-accent transition-colors p-2">
                Favorites
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
