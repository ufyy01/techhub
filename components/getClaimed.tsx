import { getUserId } from '@/getUserId';
import { FavHub } from './favoriteSlide';
import GetHubs from './getHubs';
import ProfileMessage from './profileMessage';

async function getClaimed(
  userId: string | undefined,
  query?: any
): Promise<FavHub> {
  const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/claim?userId=${userId}`;

  const url = () => {
    if (query) {
      if (query.page) {
        const params = new URLSearchParams(query);
        return `${base}&${params.toString()}`;
      }
    }
    return base;
  };

  const res = await fetch(url(), {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    console.log('Failed to fetch hubs');
  }
  const data = await res.json();
  return data as FavHub;
}

const GetClaimed = async ({
  searchParams,
}: {
  searchParams?: {
    page?: number;
  };
}) => {
  const userId = await getUserId();
  if (!userId) {
    return null;
  }
  const query = {
    page: searchParams?.page || '',
  };

  const hubs = await getClaimed(userId, query);

  return (
    <>
      <GetHubs hubs={hubs} show={false} title="Manage your claimed hubs 😎" />
      <ProfileMessage hubs={hubs} />
    </>
  );
};

export default GetClaimed;
