import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { MatchSelector } from './components/MatchSelector';
import { PredictionCard } from './components/PredictionCard';
import { usePredictionStore } from './store/predictionStore';
import { getPrediction } from './services/api';
import { TEAMS } from './constants/teams';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { cn } from './utils/cn';

function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { 
    selectedMatches, 
    predictions, 
    favorites,
    isLoading,
    generatePredictions
  } = usePredictionStore();

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get counts of complete and incomplete matches
  const completeMatches = selectedMatches.filter(match => match?.homeTeam && match?.awayTeam).length;
  const totalMatches = selectedMatches.length;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Noise texture overlay */}
      <div className="bg-noise" />
      
      <Navbar />
      <Hero />
      
      <main id="content" className="pt-16 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Match Selection */}
          <section className="mb-20" id="predictions">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Select Your Matches</h2>
              <p className="mt-4 text-muted-foreground">
                Choose home and away teams to receive detailed predictions based on historical data and advanced analytics.
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Selected Matches</span>
                <span className="text-sm font-bold">{completeMatches} of {totalMatches}</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-700 ease-apple"
                  style={{ width: `${(completeMatches / totalMatches) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
              {Array.from({ length: 8 }).map((_, index) => (
                <MatchSelector key={index} index={index} teams={TEAMS} />
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <button
                className={cn(
                  "button-primary px-8 py-4 group",
                  (isLoading || !selectedMatches.some((m) => m?.homeTeam && m?.awayTeam)) && 
                  "opacity-50 cursor-not-allowed"
                )}
                onClick={generatePredictions}
                disabled={isLoading || !selectedMatches.some((m) => m?.homeTeam && m?.awayTeam)}
              >
                {isLoading ? 'Analyzing Matches...' : 'Generate Predictions'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </section>

          {/* Prediction Results */}
          {predictions.length > 0 && (
            <section id="predictions-results" className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Prediction Results</h2>
                <p className="mt-4 text-muted-foreground">
                  Our AI analyzed historical data, current form, and team statistics to generate these predictions.
                </p>
              </div>
              
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {predictions.map((prediction, index) => (
                  <PredictionCard
                    key={`${prediction.match.homeTeam.id}-${prediction.match.awayTeam.id}`}
                    prediction={prediction}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Favorites Section */}
          {favorites.length > 0 && (
            <section id="favorites" className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Your Favorites</h2>
                <p className="mt-4 text-muted-foreground">
                  Matches you've saved for quick reference.
                </p>
              </div>
              
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((prediction, index) => (
                  <PredictionCard
                    key={`fav-${prediction.match.homeTeam.id}-${prediction.match.awayTeam.id}`}
                    prediction={prediction}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* How It Works */}
          <section id="how-it-works" className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="mt-4 text-muted-foreground">
                Our prediction system combines multiple models and extensive data analysis.
              </p>
            </div>
            
            <div className="glass-card">
              <div className="grid gap-10 md:grid-cols-3">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 22V12C3 10.9 3.9 10 5 10H19C20.1 10 21 10.9 21 12V22H3ZM9 14H7V16H9V14ZM13 14H11V16H13V14ZM17 14H15V16H17V14Z" fill="currentColor" className="opacity-80" />
                      <path d="M12 3L4 9H20L12 3Z" fill="currentColor" className="opacity-80" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">Data Collection</h3>
                  <p className="text-sm text-muted-foreground">
                    We collect historical match data, team statistics, and recent performance metrics.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 16V7.5C21 6.12 19.88 5 18.5 5H16V3H14V5H10V3H8V5H5.5C4.12 5 3 6.12 3 7.5V16C3 17.88 4.12 19 5.5 19H9.5C9.67 19.5 10 20.35 10.5 21H13.5C14 20.35 14.33 19.5 14.5 19H18.5C19.88 19 21 17.88 21 16ZM12 17L9 14L10.41 12.59L12 14.17L16.59 9.59L18 11L12 17Z" fill="currentColor" className="opacity-80" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our algorithms analyze multiple factors and patterns to identify likely outcomes.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor" className="opacity-80" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-2">Result Prediction</h3>
                  <p className="text-sm text-muted-foreground">
                    We generate detailed predictions with confidence scores and expected goals.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <button
        className={cn(
          "fixed bottom-8 right-8 p-3 rounded-full glass subtle-shadow transition-all duration-300 ease-apple z-40",
          showScrollButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowDown className="h-5 w-5 transform rotate-180" />
      </button>
      
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
