'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
const EditBtn = ({ hubId, userId }: { hubId: string; userId?: string }) => {
  const [claimed, setClaimed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkFave = async () => {
      const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/claim/hub?userId=${userId}&hubId=${hubId}`;

      const res = await fetch(base);

      const data = await res.json();

      if (data.message === 'isClaimed') {
        setClaimed(true);
      } else {
        setClaimed(false);
      }
    };

    checkFave();
  }, [hubId, userId]);

  const handleClaimed = () => {
    router.push(`/update-hub/${hubId}`);
  };
  return (
    <>
      {claimed && (
        <Button
          variant="ghost"
          onClick={handleClaimed}
          disabled={!userId}
          className="disabled:cursor-not-allowed cursor-pointer"
        >
          <Icon icon="mage:edit" style={{ width: 30, height: 30 }} />
        </Button>
      )}
    </>
  );
};

export default EditBtn;
