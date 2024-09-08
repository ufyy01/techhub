'use client';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '#',
];

const Letters = () => {
  const [letter, setLetter] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (pathname === '/get-hubs' && !searchParams.get('letter')) {
      setLetter('A');
    }
  }, [pathname, searchParams]);

  const handleLetter = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    const params = new URLSearchParams(searchParams);
    setLetter(value);
    if (value) {
      params.set('letter', value);
    } else {
      params.delete('letter');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-[15px] mr-5 space-y-1 ms-2">
      {letters.map((alpha, index) => (
        <Button
          key={index}
          className={cn(
            'text-xs md:text-sm font-bold',
            letter === alpha && 'border-b-2 border-black dark:border-white'
          )}
          variant="link"
          onClick={(e) => {
            handleLetter(e, alpha);
          }}
        >
          {alpha}
        </Button>
      ))}
    </div>
  );
};

export default Letters;
