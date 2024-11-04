import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from './ui/card';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Playfair_Display } from 'next/font/google';

interface HubItem {
  _id: string;
  name: string;
  images: [
    {
      secure_url: string;
    },
  ];
  state: string;
}

interface FavHub {
  message: string;
  data: {
    favItem: HubItem[];
  };
}

const playfair = Playfair_Display({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});
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

  return (
    <div>
      <Carousel className="lg:w-10/12 w-6/12 mx-auto">
        <CarouselContent className="-ml-1">
          {hubs.data.favItem.map((favItem, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <Link href={`/get-hubs/${favItem._id}`}>
                <Card className="flex-sm md:flex-md xl:flex-lg rounded-xl rounded-br-[70px] border-none outline-none shadow-none overflow-hidden h-[300px]">
                  <div className="relative">
                    <div className="relative w-full h-[300px]">
                      {favItem.images.length > 0 && (
                        <Image
                          src={favItem.images[0]['secure_url']}
                          alt="hub"
                          priority
                          fill
                        />
                      )}
                    </div>
                    <div className="mt-2 absolute bottom-3 left-3 z-20 w-11/12">
                      <h2
                        className={cn(
                          'text-sm md:text-xl mx-1 text-white mb-2',
                          playfair.className
                        )}
                      >
                        {favItem.name}
                      </h2>
                      <div className="flex text-[#fc045c] text-sm md:text-xl">
                        <MapPin />
                        <p>{favItem.state}</p>
                      </div>
                    </div>
                    <div className="z-10 bg-black/50 hover:bg-black/60 absolute top-0 bottom-0 w-full h-full"></div>
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FavoriteSlide;
