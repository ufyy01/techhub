import Search from '@/components/search';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Letters from '@/components/letters';
import ClearFilter from '@/components/clearFilter';
import Pagination from '@/components/custom-pagination';
import StateSort from '@/components/stateSort';
import Link from 'next/link';
import { Hubs } from './nearme';
import { FavHub } from './favoriteSlide';

const GetHubs = ({
  hubs,
  show,
  title,
}: {
  hubs: Hubs | FavHub;
  show: boolean;
  title?: string;
}) => {
  return (
    <>
      <Card className="rounded-none lg:rounded-2xl p-4 lg:w-11/12 lg:mx-auto my-6 shadow-lg ">
        {show && (
          <div className="md:flex my-5">
            <div className="lg:ms-5 flex gap-2">
              <ClearFilter />
              <StateSort />
            </div>
            <div className="ms-auto w-full mt-2 lg:mt-0">
              <Search />
            </div>
          </div>
        )}

        {hubs.data?.length > 0 && (
          <div>
            <p className="text-xl font-bold text-center my-4">{title}</p>

            <div className="flex">
              <div className="flex flex-wrap gap-1 w-full h-fit md:pl-5">
                {hubs.data.map((hub, index) => (
                  <Card
                    className="flex-sm md:flex-md xl:flex-lg rounded-xl rounded-br-[70px] border-none outline-none shadow-none overflow-hidden h-[300px]"
                    key={hub._id}
                  >
                    <div className="relative">
                      <Link href={`/get-hubs/${hub._id}`}>
                        <div className="absolute w-[90px] h-[90px] lg:w-[130px] lg:h-[120px] bg-white dark:bg-black bottom-0 right-0 rounded-tl-[50%] z-20 flex justify-center items-center ">
                          <div className="bg-black dark:bg-white lg:w-20 lg:h-20 w-10 h-10 flex justify-center items-center rounded-full">
                            <Icon
                              icon="mdi:arrow"
                              color="#fc045c"
                              style={{ width: '34', height: '34' }}
                              className="transition-all hover:rotate-12 hover:scale-150"
                            />
                          </div>
                        </div>
                      </Link>

                      <div className="relative w-full h-[300px]">
                        {hub.images.length > 0 && (
                          <Image
                            src={hub.images[0]['secure_url']}
                            alt="hub"
                            priority
                            fill
                          />
                        )}
                      </div>
                      <div className="mt-2 absolute bottom-3 left-3 z-20 w-7/12">
                        <h2
                          className={cn(
                            'text-sm md:text-base mx-1 text-white mb-2'
                          )}
                        >
                          {hub.name}
                        </h2>
                        <div className="flex text-[#fc045c] text-sm md:text-xl">
                          <MapPin />
                          <p>{hub.state}</p>
                        </div>
                      </div>
                      <div className="z-10 bg-black/50 hover:bg-black/60 absolute top-0 bottom-0 w-full h-full"></div>
                    </div>
                  </Card>
                ))}
              </div>

              {show && <Letters />}
            </div>
          </div>
        )}
        {hubs.data?.length > 0 && hubs.pagination.pages > 0 && (
          <Pagination pageCount={hubs.pagination.pages} />
        )}
        {hubs.data?.length === 0 && (
          <p className={cn('text-xl text-center')}>
            Error loading Hubs... Kindly try again
          </p>
        )}
      </Card>
    </>
  );
};

export default GetHubs;
