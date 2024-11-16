import HomeSlider from './homeSlider';

export interface HubItem {
  _id: string;
  name: string;
  images: [
    {
      secure_url: string;
    },
  ];
  state: string;
}

export interface FavHub {
  message: string;
  data: HubItem[];
  pagination: {
    page: number;
    pages: number;
  };
}

async function getFavHubs(userId?: string): Promise<FavHub> {
  const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/favs?userId=${userId}`;

  const res = await fetch(base);

  const data = await res.json();

  if (data.message !== 'success') {
    console.log('Failed to fetch hubs');
  }
  return data;
}

const FavoriteSlide = async ({ userId }: { userId: string | undefined }) => {
  const hubs = await getFavHubs(userId);

  if (!hubs.data) {
    return <p className="italic text-center">No hubs found</p>;
  }
  return <HomeSlider hubs={hubs} />;
};

export default FavoriteSlide;
