
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { MatchSelector } from './MatchSelector';
import PredictionCard from './PredictionCard';
import TeamComparison from './TeamComparison';
import PredictionStats from './PredictionStats';
import { Match } from '@/types/prediction';

const PredictorSection: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match>({
    homeTeam: null,
    awayTeam: null,
  });

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    console.log('Selected match:', match);
  };

  return (
    <section id="predictions" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="headline mb-4">Match Predictor</h2>
          <p className="subheadline max-w-3xl mx-auto">
            Select a match to see detailed predictions, statistics, and analysis.
          </p>
        </div>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <MatchSelector onMatchSelect={handleMatchSelect} />
          </CardContent>
        </Card>

        {(selectedMatch.homeTeam || selectedMatch.awayTeam) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <TeamComparison 
              homeTeam={selectedMatch.homeTeam}
              awayTeam={selectedMatch.awayTeam}
              homeStrength={58}
              awayStrength={42}
            />
            
            <PredictionStats 
              homeWinProb={45}
              drawProb={25}
              awayWinProb={30}
              homeExpectedGoals={1.8}
              awayExpectedGoals={1.2}
              bothTeamsToScoreProb={65}
            />
            
            <div className="lg:col-span-2">
              <PredictionCard
                match={{
                  homeTeam: selectedMatch.homeTeam || { 
                    id: 'home', 
                    name: 'Home Team',
                    logoUrl: '',
                    league: 'Unknown League' 
                  },
                  awayTeam: selectedMatch.awayTeam || { 
                    id: 'away', 
                    name: 'Away Team',
                    logoUrl: '',
                    league: 'Unknown League' 
                  }
                }}
                prediction={{
                  homeExpectedGoals: 1.8,
                  awayExpectedGoals: 1.2,
                  bothTeamsToScoreProb: 65,
                  predictedWinner: selectedMatch.homeTeam ? selectedMatch.homeTeam.name : 'Home Team',
                  confidence: 75,
                  modelPredictions: {
                    randomForest: "Home Win",
                    poisson: {
                      homeGoals: 1.8,
                      awayGoals: 1.2
                    },
                    elo: {
                      homeWinProb: 45,
                      drawProb: 25,
                      awayWinProb: 30
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PredictorSection;
