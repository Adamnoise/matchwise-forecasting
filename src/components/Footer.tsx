
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Branding */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center space-x-1 mb-4">
              <span className="text-xl font-bold tracking-tight">
                winmix<span className="text-accent">.hu</span>
              </span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Advanced football match prediction system powered by data-driven insights and AI analytics.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-sm mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="/" className="text-sm text-gray-500 hover:text-accent transition-colors">Home</a></li>
                <li><a href="#predictions" className="text-sm text-gray-500 hover:text-accent transition-colors">Predictions</a></li>
                <li><a href="#how-it-works" className="text-sm text-gray-500 hover:text-accent transition-colors">How it Works</a></li>
                <li><a href="#favorites" className="text-sm text-gray-500 hover:text-accent transition-colors">Favorites</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4">Leagues</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Premier League</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">La Liga</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Bundesliga</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Serie A</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">API Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Prediction Models</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Team Stats</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-accent transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {currentYear} winmix.hu. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
