
import { create } from 'zustand';
import { Match, PredictionResponse } from '../types/prediction';

interface PredictionState {
  selectedMatches: (Match | null)[];
  predictions: PredictionResponse[];
  favorites: PredictionResponse[];
  setPredictions: (predictions: PredictionResponse[]) => void;
  addFavorite: (prediction: PredictionResponse) => void;
  removeFavorite: (prediction: PredictionResponse) => void;
  setSelectedMatch: (index: number, match: Match | null) => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
  selectedMatches: Array(8).fill(null),
  predictions: [],
  favorites: [],
  setPredictions: (predictions) => set({ predictions }),
  addFavorite: (prediction) =>
    set((state) => ({
      favorites: [...state.favorites, prediction],
    })),
  removeFavorite: (prediction) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (fav) =>
          fav.match.homeTeam.id !== prediction.match.homeTeam.id ||
          fav.match.awayTeam.id !== prediction.match.awayTeam.id
      ),
    })),
  setSelectedMatch: (index, match) =>
    set((state) => {
      const newMatches = [...state.selectedMatches];
      newMatches[index] = match;
      return { selectedMatches: newMatches };
    }),
}));
