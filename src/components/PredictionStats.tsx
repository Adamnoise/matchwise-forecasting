
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PredictionStatsProps {
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  homeExpectedGoals: number;
  awayExpectedGoals: number;
  bothTeamsToScoreProb: number;
}

const PredictionStats: React.FC<PredictionStatsProps> = ({
  homeWinProb = 33,
  drawProb = 33,
  awayWinProb = 34,
  homeExpectedGoals = 1.5,
  awayExpectedGoals = 1.2,
  bothTeamsToScoreProb = 60,
}) => {
  const outcomesData = [
    { name: 'Home Win', value: homeWinProb, color: '#4CAF50' },
    { name: 'Draw', value: drawProb, color: '#FFC107' },
    { name: 'Away Win', value: awayWinProb, color: '#F44336' },
  ];

  const goalsData = [
    {
      name: 'Expected Goals',
      'Home Team': parseFloat(homeExpectedGoals.toFixed(1)),
      'Away Team': parseFloat(awayExpectedGoals.toFixed(1)),
    },
  ];

  const bttsData = [
    { name: 'Yes', value: bothTeamsToScoreProb, color: '#4CAF50' },
    { name: 'No', value: 100 - bothTeamsToScoreProb, color: '#F44336' },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-xl">Prediction Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="outcomes">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="outcomes">Match Outcome</TabsTrigger>
            <TabsTrigger value="goals">Expected Goals</TabsTrigger>
            <TabsTrigger value="btts">Both Teams to Score</TabsTrigger>
          </TabsList>
          
          <TabsContent value="outcomes" className="pt-4">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={outcomesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {outcomesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="goals" className="pt-4">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={goalsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Home Team" fill="#4CAF50" />
                  <Bar dataKey="Away Team" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="btts" className="pt-4">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bttsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {bttsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PredictionStats;
