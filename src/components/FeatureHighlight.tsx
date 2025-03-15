
import React from 'react';
import { Card, CardContent } from './ui/card';
import { 
  LineChart, 
  GanttChart, 
  Star, 
  TrendingUp, 
  BarChart4,
  BellRing
} from 'lucide-react';

const FeatureHighlight: React.FC = () => {
  const features = [
    {
      icon: <LineChart className="h-6 w-6 text-accent" />,
      title: "Advanced Analytics",
      description: "Detailed statistical breakdowns of team performance, player stats, and match trends."
    },
    {
      icon: <GanttChart className="h-6 w-6 text-accent" />,
      title: "Multi-Model System",
      description: "Predictions powered by multiple statistical models for greater accuracy."
    },
    {
      icon: <Star className="h-6 w-6 text-accent" />,
      title: "Favorites Tracking",
      description: "Save your favorite teams and matches for quick access to predictions."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-accent" />,
      title: "Form Indicators",
      description: "Visualized team form trends to better understand current performance."
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-accent" />,
      title: "Expected Goals",
      description: "xG analysis to understand the quality of chances created by each team."
    },
    {
      icon: <BellRing className="h-6 w-6 text-accent" />,
      title: "Match Alerts",
      description: "Get notified when new predictions are available for your favorite teams."
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="headline mb-4">Key Features</h2>
          <p className="subheadline max-w-3xl mx-auto">
            Discover the powerful capabilities of our prediction platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="rounded-full bg-accent/10 p-3 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;
