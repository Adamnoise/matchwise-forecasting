
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-noise"></div>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Layout;
