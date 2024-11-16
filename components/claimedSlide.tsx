import { FavHub } from './favoriteSlide';
import HomeSlider from './homeSlider';

async function getClaimedHubs(userId?: string): Promise<FavHub> {
  const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/claim?userId=${userId}`;

  const res = await fetch(base);

  const data = await res.json();

  if (data.message !== 'success') {
    console.log('Failed to fetch hubs');
  }
  return data;
}

const ClaimedSlide = async ({ userId }: { userId: string | undefined }) => {
  const hubs = await getClaimedHubs(userId);

  if (!hubs.data) {
    return <p className="italic text-center">No hubs found</p>;
  }
  return <HomeSlider hubs={hubs} />;
};

export default ClaimedSlide;
