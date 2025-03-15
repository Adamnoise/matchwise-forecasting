
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import type { Team } from '@/types/prediction';

interface TeamComparisonProps {
  homeTeam: Team | null;
  awayTeam: Team | null;
  homeStrength: number;
  awayStrength: number;
}

const TeamComparison: React.FC<TeamComparisonProps> = ({
  homeTeam,
  awayTeam,
  homeStrength = 50,
  awayStrength = 50,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-xl">Team Comparison</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 flex-col items-center">
            {homeTeam?.logoUrl ? (
              <img 
                src={homeTeam.logoUrl} 
                alt={homeTeam.name} 
                className="h-16 w-16 object-contain mb-2"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <span className="text-xl font-bold">?</span>
              </div>
            )}
            <h3 className="font-medium text-center">{homeTeam?.name || 'Home Team'}</h3>
          </div>
          
          <span className="text-2xl font-bold text-muted-foreground">vs</span>
          
          <div className="flex flex-1 flex-col items-center">
            {awayTeam?.logoUrl ? (
              <img 
                src={awayTeam.logoUrl} 
                alt={awayTeam.name} 
                className="h-16 w-16 object-contain mb-2"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <span className="text-xl font-bold">?</span>
              </div>
            )}
            <h3 className="font-medium text-center">{awayTeam?.name || 'Away Team'}</h3>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{homeTeam?.name || 'Home'}</span>
              <span className="text-sm font-medium">{awayTeam?.name || 'Away'}</span>
            </div>
            <div className="relative pt-2">
              <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="flex flex-col justify-center overflow-hidden bg-primary text-xs text-white text-center"
                  style={{ width: `${homeStrength}%` }}
                ></div>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <span className="text-xs font-semibold text-white">{homeStrength}%</span>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <span className="text-xs font-semibold text-white">{awayStrength}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h4 className="font-medium text-center mb-3">Team Statistics</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="text-center font-semibold">{homeTeam?.league || '-'}</div>
            <div className="text-center text-muted-foreground">League</div>
            <div className="text-center font-semibold">{awayTeam?.league || '-'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamComparison;
