
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import PredictorSection from '@/components/PredictorSection';
import FeatureHighlight from '@/components/FeatureHighlight';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      
      <div id="content">
        <PredictorSection />
        <HowItWorks />
        <FeatureHighlight />
      </div>
    </Layout>
  );
};

export default Index;
