import ClaimBtn from '@/components/claimBtn';
import EditBtn from '@/components/editBtn';
import FavBtn from '@/components/favBtn';
import Slider from '@/components/image-slider';
import { getSession } from '@/getSession';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const getHub = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/hub/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    notFound();
  }
  const data = res.json();
  return data;
};

const Page = async ({ params }: { params: any }) => {
  const id = params.id;

  const hub = await getHub(id);
  const user = await getSession();
  const email = user?.email as string;
  const userId = user?.id as string;

  return (
    <div>
      <Slider images={hub.data.images} />
      <div className="w-11/12 mx-auto my-5 px-2">
        <h2 className={cn('text-xl text-center my-3')}>{hub.data.name}</h2>
        <div className="relative my-4">
          <h4 className="text-center pb-2">Overview</h4>
          <div className="w-2 h-2 rounded-full bg-[#fc045c] absolute bottom-0 left-1/2"></div>
          {user && user.role === 'user' && (
            <div className="absolute -top-2 lg:-top-5 lg:left-40">
              <FavBtn userId={user?.id} hubId={id} />
            </div>
          )}
          {user && user.role === 'manager' && (
            <div className="absolute -top-2 lg:-top-5 lg:left-40">
              <EditBtn hubId={id} userId={user?.id} />
            </div>
          )}
        </div>
        <div className="md:flex justify-center gap-5 mx-2 text-center mb-3">
          {hub.data.email && (
            <div className="flex gap-1">
              <Icon
                icon="fluent:mail-28-regular"
                color="#fc045c"
                style={{ width: '34', height: '34' }}
              />
              <p>{hub.data.email}</p>
            </div>
          )}

          {hub.data.address && (
            <div className="flex gap-1 capitalize">
              <Icon
                icon="mdi:address-marker-outline"
                color="#fc045c"
                style={{ width: '34', height: '34' }}
              />
              <p>{hub.data.address}</p>
            </div>
          )}
        </div>
        <div className="flex gap-1 justify-center my-2">
          {hub.data.instagram && (
            <Link
              href={`https://${hub.data.instagram}`}
              target="_blank"
              className="bg-white dark:text-black p-2 rounded-full shadow-md"
            >
              <Icon
                icon="lucide:instagram"
                style={{ width: '20', height: '20' }}
              />
            </Link>
          )}

          {hub.data.twitter && (
            <Link
              href={`https://${hub.data.twitter}`}
              target="_blank"
              className="bg-white dark:text-black p-2 rounded-full shadow-md"
            >
              <Icon
                icon="pajamas:twitter"
                style={{ width: '20', height: '20' }}
              />
            </Link>
          )}

          {hub.data.tiktok && (
            <Link
              href={`https://${hub.data.tiktok}`}
              target="_blank"
              className="bg-white dark:text-black p-2 rounded-full shadow-md"
            >
              <Icon
                icon="ic:baseline-tiktok"
                style={{ width: '20', height: '20' }}
              />
            </Link>
          )}

          {hub.data.website && (
            <Link
              href={`https://${hub.data.website}`}
              target="_blank"
              className="bg-white dark:text-black p-2 rounded-full shadow-md"
            >
              <Icon icon="iconoir:www" style={{ width: '20', height: '20' }} />
            </Link>
          )}

          {hub.data.phone && (
            <Link
              href={`https://${hub.data.phone}`}
              target="_blank"
              className="bg-white dark:text-black p-2 rounded-full shadow-md"
            >
              <Icon
                icon="ic:round-phone"
                style={{ width: '20', height: '20' }}
              />
            </Link>
          )}
        </div>
        <div className="lg:flex lg:pb-10 items-stretch w-full justify-center">
          <div className="flex-none ">
            {hub.data.schedule.length > 0 && (
              <div className="dark:bg-black bg-white text-black mt-3 rounded-lg dark:text-white p-3 lg:w-fit shadow-md mx-2 text-center border-2">
                <h4>Opening Schedule</h4>
                <ul className="flex flex-col items-center">
                  {hub.data.schedule.map((day: string, i: number) => (
                    <li key={i} className="my-2">
                      <div className="flex gap-2 text-base items-center">
                        <p className="pt-2 mr-2">{day}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {hub.data.description && (
              <div className="dark:bg-black bg-white text-black mt-3 rounded-lg dark:text-white p-3 lg:w-full shadow-md mx-2 text-center border-2 h-1/2">
                <h4>About Us</h4>
                <p className="mt-3">{hub.data.description}</p>
              </div>
            )}
            {hub.data.notice && (
              <div className="dark:bg-black bg-white text-black mt-3 rounded-lg dark:text-white p-3 lg:w-full shadow-md mx-2 text-center border-2 ">
                <h4>Notice</h4>
                <p className="mt-3">{hub.data.notice}</p>
              </div>
            )}
          </div>
        </div>
        {user && user.role === 'manager' && (
          <div className="text-center my-4">
            {!hub.data.hubClaimed && (
              <ClaimBtn email={email} userId={userId} hubId={id} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
