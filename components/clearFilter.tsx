'use client';
import { Button } from './ui/button';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  style: 'italic',
});

const ClearFilter = () => {
  const handleClearFilters = () => {
    window.location.href = '/get-hubs';
  };

  return (
    <div>
      <Button onClick={handleClearFilters} className={`${playfair.className}`}>
        Clear Filter
      </Button>
    </div>
  );
};

export default ClearFilter;
