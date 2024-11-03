import React from 'react';
import HeroSlider from './HeroSlider';
import YearCards from './YearCards';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSlider />
      <div className="relative -mt-20 z-20 pb-20">
        <YearCards />
      </div>
    </div>
  );
}