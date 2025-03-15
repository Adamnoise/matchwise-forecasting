
import React, { useState } from 'react';
import { Star, TrendingUp, BarChart4, Activity } from 'lucide-react';
import { PredictionResponse } from '../types/prediction';
import { usePredictionStore } from '../store/predictionStore';
import { cn } from '../utils/cn';

interface PredictionCardProps {
  prediction: PredictionResponse;
  index: number;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, index }) => {
  const { favorites, addFavorite, removeFavorite } = usePredictionStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const isFavorite = favorites.some(
    (fav) =>
      fav.match.homeTeam.id === prediction.match.homeTeam.id &&
      fav.match.awayTeam.id === prediction.match.awayTeam.id
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(prediction);
    } else {
      addFavorite(prediction);
    }
  };

  // Helper function to determine the color for the confidence
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'text-emerald-500';
    if (confidence >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  // Format percentage with + sign if positive
  const formatPercentage = (value: number) => {
    return value > 0 ? `+${value.toFixed(0)}%` : `${value.toFixed(0)}%`;
  };

  return (
    <div
      className={cn(
        'prediction-card glass-card relative overflow-hidden group',
        index < 3 && 'border-accent/30'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badge */}
      {index === 0 && (
        <div className="absolute -top-3 -left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse-subtle">
          Top Pick
        </div>
      )}

      {/* Favorite Button */}
      <button
        className={cn(
          'absolute top-4 right-4 z-10 transition-all duration-300',
          isFavorite ? 'text-accent/80' : 'text-gray-400 hover:text-gray-600'
        )}
        onClick={toggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star className={cn(
          'transition-all duration-300 ease-apple',
          isFavorite ? 'fill-accent/80 stroke-accent/80' : 'fill-transparent'
        )} size={18} />
      </button>

      {/* Teams Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex-1">
          <div className="h-16 w-16 mx-auto relative">
            <div className={cn(
              'absolute inset-0 rounded-full bg-gray-50 transition-all duration-300',
              isHovered && 'scale-105'
            )} />
            <img
              src={prediction.match.homeTeam.logoUrl}
              alt={prediction.match.homeTeam.name}
              className="h-12 w-12 object-contain absolute inset-0 m-auto"
              loading="lazy"
            />
          </div>
          <h3 className="mt-2 text-sm font-medium truncate max-w-[90px] mx-auto">
            {prediction.match.homeTeam.name}
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center mx-1">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">vs</div>
          {prediction.prediction && (
            <div className="flex space-x-2 text-sm font-bold text-accent">
              <span>{prediction.prediction.homeExpectedGoals.toFixed(1)}</span>
              <span>:</span>
              <span>{prediction.prediction.awayExpectedGoals.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="text-center flex-1">
          <div className="h-16 w-16 mx-auto relative">
            <div className={cn(
              'absolute inset-0 rounded-full bg-gray-50 transition-all duration-300',
              isHovered && 'scale-105'
            )} />
            <img
              src={prediction.match.awayTeam.logoUrl}
              alt={prediction.match.awayTeam.name}
              className="h-12 w-12 object-contain absolute inset-0 m-auto"
              loading="lazy"
            />
          </div>
          <h3 className="mt-2 text-sm font-medium truncate max-w-[90px] mx-auto">
            {prediction.match.awayTeam.name}
          </h3>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 w-full my-6" />

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Home Wins</div>
          <div className="text-lg font-semibold">
            {prediction.teamAnalysis.headToHeadStats.homeWins}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Draws</div>
          <div className="text-lg font-semibold">
            {prediction.teamAnalysis.headToHeadStats.draws}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Away Wins</div>
          <div className="text-lg font-semibold">
            {prediction.teamAnalysis.headToHeadStats.awayWins}
          </div>
        </div>
      </div>

      {/* Prediction Metrics */}
      <div className="space-y-4">
        {/* Both Teams to Score */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Activity size={14} className="text-gray-500 mr-2" />
              <span className="text-xs font-medium">Both Teams to Score</span>
            </div>
            <span className="text-xs font-bold">{prediction.prediction.bothTeamsToScoreProb}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn("h-full bg-accent/70 rounded-full transition-all duration-700 ease-apple")}
              style={{ width: `${prediction.prediction.bothTeamsToScoreProb}%` }}
            />
          </div>
        </div>

        {/* Expected Goals */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <BarChart4 size={14} className="text-gray-500 mr-2" />
              <span className="text-xs font-medium">Avg. Goals</span>
            </div>
            <span className="text-xs font-bold">{prediction.teamAnalysis.averageGoals.averageTotalGoals.toFixed(1)}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent/70 rounded-full transition-all duration-700 ease-apple"
              style={{ width: `${Math.min(prediction.teamAnalysis.averageGoals.averageTotalGoals / 5 * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Win Probability */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <TrendingUp size={14} className="text-gray-500 mr-2" />
              <span className="text-xs font-medium">Prediction Score</span>
            </div>
            <span className="text-xs font-bold">
              {prediction.teamAnalysis.predictionScore?.toFixed(1) || "N/A"}
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent/70 rounded-full transition-all duration-700 ease-apple"
              style={{ width: `${Math.min((prediction.teamAnalysis.predictionScore || 0) / 10 * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Prediction Result */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Predicted Winner</div>
          <div className="font-semibold text-accent">
            {prediction.prediction.predictedWinner}
          </div>
          <div className={cn(
            "text-xs font-medium mt-1",
            getConfidenceColor(prediction.prediction.confidence)
          )}>
            {prediction.prediction.confidence}% Confidence
          </div>
        </div>
      </div>
    </div>
  );
};
