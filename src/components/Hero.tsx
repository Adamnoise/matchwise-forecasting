
import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToContent = () => {
    const contentElement = document.getElementById('content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-subtle animate-delay-500" />
      </div>
      
      {/* Content */}
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block py-1 px-4 rounded-full text-sm bg-accent/10 text-accent mb-4 animate-fade-in-down">
          Precision Match Predictions
        </span>
        
        <h1 className="headline mb-6 animate-fade-in-down animate-delay-100">
          Advanced Football Match <span className="text-accent">Prediction</span> System
        </h1>
        
        <p className="subheadline mb-10 max-w-2xl mx-auto animate-fade-in-down animate-delay-200">
          Leverage data-driven insights and AI-powered analytics to forecast match outcomes with exceptional accuracy.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-down animate-delay-300">
          <button 
            onClick={scrollToContent}
            className="button-primary"
          >
            Get Started
          </button>
          
          <a href="#how-it-works" className="button-secondary">
            Learn More
          </a>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-sm text-primary/60 hover:text-primary animate-fade-in animate-delay-500"
        aria-label="Scroll to content"
      >
        <span className="mb-2">Scroll Down</span>
        <ArrowDown className="animate-float" size={20} />
      </button>
    </section>
  );
};

export default Hero;
