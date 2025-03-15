
import React from 'react';
import { Card, CardContent } from './ui/card';
import { 
  TrendingUp, 
  Database, 
  BarChart, 
  Zap 
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Database className="h-8 w-8 text-accent" />,
      title: "Data Collection",
      description: "We gather comprehensive match data, team statistics, and historical performances from multiple trusted sources."
    },
    {
      icon: <BarChart className="h-8 w-8 text-accent" />,
      title: "Statistical Analysis",
      description: "Our algorithms analyze team form, head-to-head records, expected goals, and other key performance indicators."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: "Model Processing",
      description: "Multiple prediction models including Random Forest, Poisson Distribution, and ELO ratings process the data."
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Prediction Generation",
      description: "The system generates accurate predictions for match outcomes, expected goals, and other key metrics."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="headline mb-4">How It Works</h2>
          <p className="subheadline max-w-3xl mx-auto">
            Our advanced prediction system combines sophisticated data analysis with machine learning to deliver highly accurate football match forecasts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="glass-card transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-accent/10 p-3 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
