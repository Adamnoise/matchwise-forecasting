
import axios from 'axios';
import { PredictionResponse } from '../types/prediction';

const API_BASE_URL = 'https://winmix.hu/api/2/fullapi.php';

export const getPrediction = async (
  homeTeam: string,
  awayTeam: string
): Promise<PredictionResponse> => {
  const response = await axios.get(API_BASE_URL, {
    params: {
      home_team: homeTeam,
      away_team: awayTeam,
    },
  });
  return response.data;
};
