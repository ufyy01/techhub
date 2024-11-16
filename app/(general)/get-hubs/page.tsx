import GetHubs from '@/components/getHubs';
import { Hubs } from '@/components/nearme';

async function getHubs(query?: any): Promise<Hubs> {
  const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/hub`;

  const url = () => {
    if (query) {
      if (query.search) {
        return `${base}?search=${query.search}`;
      } else if (query.letter) {
        return `${base}?letter=${query.letter}`;
      } else if (query.page) {
        const params = new URLSearchParams(query);
        return `${base}?${params.toString()}`;
      } else if (query.sort) {
        return `${base}?sort=${query.sort}`;
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
    throw new Error('Failed to fetch hubs');
  }
  const data = await res.json();
  return data as Hubs;
}

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    letter?: string;
    page?: number;
    sort?: string;
  };
}) => {
  const query = {
    search: searchParams?.search || '',
    letter: searchParams?.letter || '',
    page: searchParams?.page || '',
    sort: searchParams?.sort || '',
  };

  const hubs = await getHubs(query);

  return (
    <>
      <GetHubs hubs={hubs} show={true} />
    </>
  );
};

export default Page;
