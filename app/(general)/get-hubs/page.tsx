import { Hub } from '@/components/nearme';
import { Card } from '@/components/ui/card';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';

async function getHubs(): Promise<Hub[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/hub`);

  if (!res.ok) {
    throw new Error('Failed to fetch hubs');
  }
  const data = await res.json();

  return data.data as Hub[];
}

const Page = async () => {
  const hubs = await getHubs();

  return (
    <>
      <div className="flex">
        <div className="flex flex-wrap h-full pb-6">
          {hubs.map((hub) => (
            <div
              key={hub._id}
              className="w-9/12 lg:w-[370px] m-3
          "
            >
              <Card className="w-full h-[250px] lg:h-[350px] relative rounded-xl z-0 rounded-br-[70px] border-none outline-none shadow-none">
                <div className="absolute w-[100px] h-[120px] bg-white -bottom-1 -right-1 rounded-tl-[50%] z-50 flex justify-center items-center">
                  <div className="bg-[#fc045c] w-20 h-20 flex justify-center items-center rounded-full z-50">
                    <Icon
                      icon="mdi:arrow"
                      color="white"
                      style={{ width: '34', height: '34' }}
                    />
                  </div>
                </div>

                <div className="relative w-full h-full">
                  <Image
                    src={hub.images[0]['secure_url']}
                    alt="hub"
                    priority
                    fill
                    className="rounded-3xl"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {hubs.length === 0 && <p>Error loading Hubs. Kindly try again</p>}
    </>
  );
};

export default Page;
