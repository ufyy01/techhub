'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import { Input } from './ui/input';
import { KeyboardEvent, ReactEventHandler, useState } from 'react';
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
  const [showInput, setShowInput] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value.trim();

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      replace(`${pathname}?${params.toString()}`);
      setShowInput(false);
    }
  };

  return (
    <div className="relative h-10 md:w-8/12 ml-auto w-full">
      {showInput && (
        <Input
          className="h-full w-full transition-all"
          placeholder="Search for hubs here..."
          onKeyUp={handleSearch}
          defaultValue={searchParams.get('search')?.toString()}
        />
      )}
      <Button
        className="max-w-fit p-2 rounded-full absolute right-1 top-0.5"
        onClick={() => setShowInput(!showInput)}
      >
        <Icon
          icon="ic:round-search"
          style={{ fontSize: '20px' }}
          className="dark:text-black light:text-white transition-all hover:rotate-90 hover:scale-150"
        />
      </Button>
    </div>
  );
};

export default Search;
