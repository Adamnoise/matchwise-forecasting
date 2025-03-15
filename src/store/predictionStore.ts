
import { create } from 'zustand';
import { Match, PredictionResponse } from '../types/prediction';
import { getPrediction } from '../services/api';
import { toast } from 'react-hot-toast';

interface PredictionState {
  selectedMatches: (Match | null)[];
  predictions: PredictionResponse[];
  favorites: PredictionResponse[];
  isLoading: boolean;
  error: string | null;
  setPredictions: (predictions: PredictionResponse[]) => void;
  addFavorite: (prediction: PredictionResponse) => void;
  removeFavorite: (prediction: PredictionResponse) => void;
  setSelectedMatch: (index: number, match: Match | null) => void;
  generatePredictions: () => Promise<boolean>;
  clearPredictions: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePredictionStore = create<PredictionState>((set, get) => ({
  selectedMatches: Array(8).fill(null),
  predictions: [],
  favorites: [],
  isLoading: false,
  error: null,
  
  setPredictions: (predictions) => set({ predictions }),
  
  addFavorite: (prediction) => {
    set((state) => {
      // Check if already in favorites
      const alreadyExists = state.favorites.some(
        (fav) =>
          fav.match.homeTeam.id === prediction.match.homeTeam.id &&
          fav.match.awayTeam.id === prediction.match.awayTeam.id
      );
      
      if (alreadyExists) {
        return state;
      }
      
      toast.success(`Added ${prediction.match.homeTeam.name} vs ${prediction.match.awayTeam.name} to favorites!`);
      return { favorites: [...state.favorites, prediction] };
    });
  },
  
  removeFavorite: (prediction) => {
    set((state) => {
      toast.success(`Removed from favorites!`);
      return {
        favorites: state.favorites.filter(
          (fav) =>
            fav.match.homeTeam.id !== prediction.match.homeTeam.id ||
            fav.match.awayTeam.id !== prediction.match.awayTeam.id
        ),
      };
    });
  },
  
  setSelectedMatch: (index, match) =>
    set((state) => {
      const newMatches = [...state.selectedMatches];
      newMatches[index] = match;
      return { selectedMatches: newMatches };
    }),
    
  generatePredictions: async () => {
    const { selectedMatches, setLoading, setPredictions, setError } = get();
    
    // Filter out invalid matches
    const validMatches = selectedMatches.filter(
      (match) => match?.homeTeam && match?.awayTeam
    );
    
    if (validMatches.length === 0) {
      toast.error('Please select at least one match to generate predictions');
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Generate predictions for all valid matches
      const results = await Promise.all(
        validMatches.map((match) =>
          getPrediction(match!.homeTeam.name, match!.awayTeam.name)
        )
      );
      
      // Sort predictions by prediction score (descending)
      const sortedResults = results.sort((a, b) => 
        (b.teamAnalysis.predictionScore || 0) - (a.teamAnalysis.predictionScore || 0)
      );
      
      setPredictions(sortedResults);
      
      // Scroll to predictions section
      const predictionElement = document.getElementById('predictions-results');
      if (predictionElement) {
        setTimeout(() => {
          predictionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
      
      toast.success(`Generated ${results.length} predictions successfully!`);
      return true;
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
      setError('Failed to generate predictions. Please try again.');
      toast.error('Failed to generate predictions. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  },
  
  clearPredictions: () => set({ predictions: [] }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
}));
