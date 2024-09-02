import { Hub } from '@/components/nearme';
import Search from '@/components/search';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MapPin } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

const playfair = Playfair_Display({
  weight: '800',
  subsets: ['latin'],
  style: 'normal',
});
async function getHubs(query?: any): Promise<Hub[]> {
  const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/hub`;

  const url = () => {
    if (query) {
      return `${base}?search=${query}`;
    }
    return base;
  };

  const res = await fetch(url());

  if (!res.ok) {
    throw new Error('Failed to fetch hubs');
  }
  const data = await res.json();

  return data.data as Hub[];
}

const Page = async ({
  searchParams,
}: {
  searchParams?: { search?: string };
}) => {
  const search = searchParams?.search || '';

  const hubs = await getHubs(search);

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

  return (
    <>
      <Card className="rounded-2xl p-4 w-11/12 mx-auto my-6 ">
        <div className="my-5">
          <div>
            <Search />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-wrap gap-5 w-full md:pl-5 mb-10">
            {hubs.map((hub, index) => (
              <Card
                className="flex-sm md:flex-md lg:flex-lg rounded-xl rounded-br-[70px] border-none outline-none shadow-none overflow-hidden h-[300px]"
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

          <div className="w-[15px] mr-5 space-y-1 ms-2">
            {letters.map((letter, index) => (
              <Button
                key={index}
                className={cn(
                  'text-xs md:text-sm font-bold',
                  index === 0 && 'border-b-2 border-black dark:border-white'
                )}
                variant="link"
                // href={`?search=${letter}`}
              >
                {letter}
              </Button>
            ))}
          </div>
        </div>

        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button>
                <PaginationPrevious href="#" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button>
                <PaginationLink href="#">1</PaginationLink>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button>
                <PaginationEllipsis />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button>
                <PaginationNext href="#" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </Card>

      {hubs.length === 0 && <p>Error loading Hubs. Kindly try again</p>}
    </>
  );
};

export default Page;
