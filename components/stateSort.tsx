'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

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
      <Button onClick={handleSort}>Sort</Button>
    </div>
  );
};

export default StateSort;
