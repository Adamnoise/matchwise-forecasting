
import axios from 'axios';
import { PredictionResponse } from '../types/prediction';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'https://winmix.hu/api/2/fullapi.php';

export const getPrediction = async (
  homeTeam: string,
  awayTeam: string
): Promise<PredictionResponse> => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        home_team: homeTeam,
        away_team: awayTeam,
      },
    });
    
    // Transform the API response to match our frontend types
    const data = response.data;
    
    // Return the formatted prediction response
    return {
      match: {
        homeTeam: {
          id: homeTeam.toLowerCase().replace(/\s+/g, ''),
          name: homeTeam,
          logoUrl: getTeamLogoUrl(homeTeam),
          league: 'premier-league'
        },
        awayTeam: {
          id: awayTeam.toLowerCase().replace(/\s+/g, ''),
          name: awayTeam,
          logoUrl: getTeamLogoUrl(awayTeam),
          league: 'premier-league'
        }
      },
      teamAnalysis: {
        homeTeam: data.team_analysis.home_team,
        awayTeam: data.team_analysis.away_team,
        matchesCount: data.team_analysis.matches_count,
        bothTeamsScoredPercentage: data.team_analysis.both_teams_scored_percentage,
        averageGoals: {
          averageTotalGoals: data.team_analysis.average_goals.average_total_goals,
          averageHomeGoals: data.team_analysis.average_goals.average_home_goals,
          averageAwayGoals: data.team_analysis.average_goals.average_away_goals
        },
        homeFormIndex: data.team_analysis.home_form_index,
        awayFormIndex: data.team_analysis.away_form_index,
        headToHeadStats: {
          homeWins: data.team_analysis.head_to_head_stats.home_wins,
          awayWins: data.team_analysis.head_to_head_stats.away_wins,
          draws: data.team_analysis.head_to_head_stats.draws,
          homeWinPercentage: data.team_analysis.head_to_head_stats.home_win_percentage,
          awayWinPercentage: data.team_analysis.head_to_head_stats.away_win_percentage,
          drawPercentage: data.team_analysis.head_to_head_stats.draw_percentage
        },
        predictionScore: calculatePredictionScore(data)
      },
      prediction: {
        homeExpectedGoals: data.prediction.homeExpectedGoals,
        awayExpectedGoals: data.prediction.awayExpectedGoals,
        bothTeamsToScoreProb: data.prediction.bothTeamsToScoreProb,
        predictedWinner: formatPredictedWinner(data.prediction.predictedWinner, data.team_analysis.home_team, data.team_analysis.away_team),
        confidence: data.prediction.confidence * 100, // Convert to percentage
        modelPredictions: {
          randomForest: data.prediction.modelPredictions.randomForest,
          poisson: {
            homeGoals: data.prediction.modelPredictions.poisson.homeGoals,
            awayGoals: data.prediction.modelPredictions.poisson.awayGoals
          },
          elo: {
            homeWinProb: data.prediction.modelPredictions.elo.homeWinProb * 100, // Convert to percentage
            drawProb: data.prediction.modelPredictions.elo.drawProb * 100, // Convert to percentage
            awayWinProb: data.prediction.modelPredictions.elo.awayWinProb * 100 // Convert to percentage
          }
        }
      }
    };
  } catch (error) {
    console.error('Error fetching prediction:', error);
    toast.error('Failed to fetch prediction. Please try again.');
    throw error;
  }
};

// Helper function to get team logo URL based on team name
function getTeamLogoUrl(teamName: string): string {
  const defaultLogo = 'https://resources.premierleague.com/premierleague/badges/50/t0.png';
  
  // Logic to map team names to logo URLs (simplified for now)
  return defaultLogo;
}

// Helper function to calculate a prediction score for sorting/ranking
function calculatePredictionScore(data: any): number {
  // Example calculation based on various factors
  const confidenceWeight = data.prediction.confidence * 3;
  const formIndex = (data.team_analysis.home_form_index + data.team_analysis.away_form_index) / 2;
  const matchCountFactor = Math.min(data.team_analysis.matches_count / 10, 1);
  
  return parseFloat((confidenceWeight + formIndex * matchCountFactor).toFixed(1));
}

// Helper function to format the predicted winner
function formatPredictedWinner(winner: string, homeTeam: string, awayTeam: string): string {
  if (winner === 'home') return homeTeam;
  if (winner === 'away') return awayTeam;
  return 'Draw';
}
