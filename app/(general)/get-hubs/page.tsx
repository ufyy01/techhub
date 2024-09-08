import { Hubs } from '@/components/nearme';
import Search from '@/components/search';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Letters from '@/components/letters';
import ClearFilter from '@/components/clearFilter';
import { Playfair_Display } from 'next/font/google';
import Pagination from '@/components/custom-pagination';

const playfair = Playfair_Display({
  weight: '800',
  subsets: ['latin'],
  style: 'normal',
});
async function getHubs(query?: any): Promise<Hubs> {
  const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/hub`;

  const url = () => {
    if (query) {
      if (query.search) {
        return `${base}?search=${query.search}`;
      } else if (query.letter) {
        return `${base}?letter=${query.letter}`;
      } else if (query.page) {
        return `${base}?page=${query.page}`;
      }
    }
    return base;
  };

  const res = await fetch(url());

  if (!res.ok) {
    throw new Error('Failed to fetch hubs');
  }
  const data = await res.json();
  return data as Hubs;
}

const Page = async ({
  searchParams,
}: {
  searchParams?: { search?: string; letter?: string; page?: number };
}) => {
  const query = {
    search: searchParams?.search || '',
    letter: searchParams?.letter || '',
    page: searchParams?.page || '',
  };

  const hubs = await getHubs(query);

  return (
    <>
      <Card className="rounded-2xl p-4 w-11/12 mx-auto my-6 ">
        <div className="flex my-5">
          <div className="lg:ms-5">
            <ClearFilter />
          </div>
          <div className="ms-auto w-full">
            <Search />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-wrap gap-2 w-full h-fit md:pl-5">
            {hubs.data.map((hub, index) => (
              <Card
                className="flex-sm md:flex-md xl:flex-lg rounded-xl rounded-br-[70px] border-none outline-none shadow-none overflow-hidden h-[300px]"
                key={hub._id}
              >
                <div className="relative">
                  <div className="absolute w-[100px] h-[120px] bg-white dark:bg-black bottom-0 right-0 rounded-tl-[50%] z-20 flex justify-center items-center">
                    <div className="bg-black dark:bg-white w-20 h-20 flex justify-center items-center rounded-full">
                      <Icon
                        icon="mdi:arrow"
                        color="#fc045c"
                        style={{ width: '34', height: '34' }}
                        className="transition-all hover:rotate-12 hover:scale-150"
                      />
                    </div>
                  </div>

                  <div className="relative w-full h-[300px]">
                    <Image
                      src={hub.images[0]['secure_url']}
                      alt="hub"
                      priority
                      fill
                    />
                  </div>
                  <div className="mt-2 absolute bottom-3 left-3 z-20 w-6/12">
                    <h2
                      className={cn(
                        'text-xl mx-2 text-white mb-2',
                        playfair.className
                      )}
                    >
                      {hub.name}
                    </h2>
                    <div className="flex text-[#fc045c]">
                      <MapPin />
                      <p>{hub.state}</p>
                    </div>
                  </div>
                  <div className="z-10 bg-black/50 hover:bg-black/60 absolute top-0 bottom-0 w-full h-full"></div>
                </div>
              </Card>
            ))}
          </div>

          <Letters />
        </div>
        {hubs.pagination && <Pagination pageCount={hubs.pagination.pages} />}
      </Card>

      {hubs.data.length === 0 && <p>Error loading Hubs. Kindly try again</p>}
    </>
  );
};

export default Page;
