'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});

const StateSort = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);
    if (params.has('sort')) {
      params.delete('sort');
    } else {
      params.set('sort', 'state');
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <Button className={playfair.className} onClick={handleSort}>
        Sort By State
      </Button>
    </div>
  );
};

export default StateSort;
