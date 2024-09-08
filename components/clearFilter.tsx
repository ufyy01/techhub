'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});

const ClearFilter = () => {
  const router = useRouter();

  const handleClearFilters = () => {
    router.push('/get-hubs');
  };

  return (
    <div>
      <Button onClick={handleClearFilters} className={playfair.className}>
        Clear Filter
      </Button>
    </div>
  );
};

export default ClearFilter;
