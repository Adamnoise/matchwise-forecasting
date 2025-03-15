
import React, { useState } from 'react';
import { Team } from '../types/prediction';
import { usePredictionStore } from '../store/predictionStore';
import { cn } from '../utils/cn';

interface MatchSelectorProps {
  index: number;
  teams: Team[];
}

export const MatchSelector: React.FC<MatchSelectorProps> = ({ index, teams }) => {
  const { selectedMatches, setSelectedMatch } = usePredictionStore();
  const currentMatch = selectedMatches[index];
  const [focusState, setFocusState] = useState<'none' | 'home' | 'away'>('none');

  const handleTeamSelect = (position: 'home' | 'away', teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return;

    const otherTeam = position === 'home' ? currentMatch?.awayTeam : currentMatch?.homeTeam;
    
    if (position === 'home') {
      setSelectedMatch(index, {
        homeTeam: team,
        awayTeam: otherTeam || null,
      });
    } else {
      setSelectedMatch(index, {
        homeTeam: otherTeam || null,
        awayTeam: team,
      });
    }
  };

  const isTeamSelected = (teamId: string) =>
    selectedMatches.some(
      (match) =>
        match?.homeTeam?.id === teamId || match?.awayTeam?.id === teamId
    );

  return (
    <div 
      className={cn(
        "glass-card transition-all duration-300",
        currentMatch?.homeTeam && currentMatch?.awayTeam 
          ? "border-accent/30" 
          : "border-transparent"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Match Number */}
      <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs font-medium border border-gray-200 subtle-shadow">
        {index + 1}
      </div>
      
      <div className="space-y-4">
        {/* Home Team Selection */}
        <div className="relative">
          <div 
            className={cn(
              "relative overflow-hidden rounded-xl transition-all duration-300 ease-apple",
              focusState === 'home' ? "ring-2 ring-accent" : "ring-1 ring-gray-200",
              currentMatch?.homeTeam ? "bg-white" : "bg-gray-50"
            )}
          >
            <select
              className={cn(
                "w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-sm",
                "focus:outline-none"
              )}
              value={currentMatch?.homeTeam?.id || ''}
              onChange={(e) => handleTeamSelect('home', e.target.value)}
              onFocus={() => setFocusState('home')}
              onBlur={() => setFocusState('none')}
            >
              <option value="">Select home team</option>
              {teams.map((team) => (
                <option
                  key={`home-${team.id}`}
                  value={team.id}
                  disabled={isTeamSelected(team.id) && team.id !== currentMatch?.homeTeam?.id}
                >
                  {team.name}
                </option>
              ))}
            </select>
            
            {/* Custom arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Team logo */}
          {currentMatch?.homeTeam && (
            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-10">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-white subtle-shadow flex items-center justify-center">
                <img
                  src={currentMatch.homeTeam.logoUrl}
                  alt={`${currentMatch.homeTeam.name} Logo`}
                  className="w-5 h-5 object-contain"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Versus indicator */}
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-medium">
            VS
          </div>
        </div>
        
        {/* Away Team Selection */}
        <div className="relative">
          <div 
            className={cn(
              "relative overflow-hidden rounded-xl transition-all duration-300 ease-apple",
              focusState === 'away' ? "ring-2 ring-accent" : "ring-1 ring-gray-200",
              currentMatch?.awayTeam ? "bg-white" : "bg-gray-50"
            )}
          >
            <select
              className={cn(
                "w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-sm",
                "focus:outline-none"
              )}
              value={currentMatch?.awayTeam?.id || ''}
              onChange={(e) => handleTeamSelect('away', e.target.value)}
              onFocus={() => setFocusState('away')}
              onBlur={() => setFocusState('none')}
            >
              <option value="">Select away team</option>
              {teams.map((team) => (
                <option
                  key={`away-${team.id}`}
                  value={team.id}
                  disabled={isTeamSelected(team.id) && team.id !== currentMatch?.awayTeam?.id}
                >
                  {team.name}
                </option>
              ))}
            </select>
            
            {/* Custom arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Team logo */}
          {currentMatch?.awayTeam && (
            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-10">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-white subtle-shadow flex items-center justify-center">
                <img
                  src={currentMatch.awayTeam.logoUrl}
                  alt={`${currentMatch.awayTeam.name} Logo`}
                  className="w-5 h-5 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
