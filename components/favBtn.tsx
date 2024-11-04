'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const FavBtn = ({ hubId, userId }: { hubId: string; userId?: string }) => {
  const [fav, setFave] = useState(false);

  const router = useRouter();

  const handleFave = async () => {
    const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/favs?userId=${userId}&hubId=${hubId}`;

    const res = await fetch(base, {
      method: 'PATCH',
    });

    const data = await res.json();
    setFave(!fav);
    Swal.fire({
      icon: 'success',
      text: `${data.message}`,
      showConfirmButton: false,
      showCancelButton: false,
      timer: 1500,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
    router.refresh();
    return data;
  };

  return (
    <>
      {!fav && (
        <Button
          variant="ghost"
          onClick={handleFave}
          disabled={!userId}
          className="disabled:cursor-not-allowed cursor-pointer"
        >
          <Icon
            icon="emojione-monotone:red-heart"
            style={{ width: 30, height: 30 }}
          />
        </Button>
      )}
      {fav && (
        <Button
          variant="ghost"
          onClick={handleFave}
          disabled={!userId}
          className="disabled:cursor-not-allowed cursor-pointer "
        >
          <Icon
            icon="fluent-emoji-flat:red-heart"
            style={{ width: 30, height: 30 }}
          />
        </Button>
      )}
    </>
  );
};

export default FavBtn;
