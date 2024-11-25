import Nearme from '@/components/nearme';
import Link from 'next/link';
import FavoriteSlide from '@/components/favoriteSlide';
import HeroAni from '@/components/heroAni';
import { getSession } from '@/getSession';
import ClaimedSlide from '@/components/claimedSlide';

export default async function Home() {
  const user = await getSession();

  return (
    <main>
      <div>
        <div className="text-center mt-4 mx-4">
          <h1 className="text-2xl md:text-3xl text-[#fc045c] pb-2">
            Find the Right Space to Do More
          </h1>
          <p className="text-sm text-[#fc045c] mb-2 text-center">
            Discover the perfect co-working space near you.
          </p>
        </div>
        <div className="relative mt-6">
          <div className="absolute -top-10 left-0 lg:w-7/12">
            <HeroAni />
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,32L17.1,69.3C34.3,107,69,181,103,186.7C137.1,192,171,128,206,106.7C240,85,274,107,309,128C342.9,149,377,171,411,197.3C445.7,224,480,256,514,229.3C548.6,203,583,117,617,112C651.4,107,686,181,720,213.3C754.3,245,789,235,823,213.3C857.1,192,891,160,926,122.7C960,85,994,43,1029,48C1062.9,53,1097,107,1131,154.7C1165.7,203,1200,245,1234,229.3C1268.6,213,1303,139,1337,90.7C1371.4,43,1406,21,1423,10.7L1440,0L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="bg-black text-white -mt-1 pt-5 pb-14">
        <div className="lg:w-10/12 lg:mx-auto mx-4 mb-5">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Featured</h3>
            <Link href="/get-hubs">
              <p className="text-base">All</p>
            </Link>
          </div>
          <p className="text-sm">Explore Hubs near you</p>
        </div>
        <Nearme />
        {user && user.role === 'user' && (
          <div className="mt-10 pb-5">
            <div className="lg:w-10/12 lg:mx-auto mx-4 mb-5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Favourite</h3>
                <Link href="/profile">
                  <p className="text-base">All</p>
                </Link>
              </div>
              <p className="text-sm">Explore your favourite Hubs</p>
            </div>
            {user.role === 'user' && <FavoriteSlide userId={user.id} />}
          </div>
        )}
        {user && user.role === 'manager' && (
          <div className="mt-10 pb-5">
            <div className="lg:w-10/12 lg:mx-auto mx-4 mb-5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Claimed</h3>
                <Link href="/profile">
                  <p className="text-base">All</p>
                </Link>
              </div>
              <p className="text-sm">Explore your claimed Hubs</p>
            </div>
            {user.role === 'manager' && <ClaimedSlide userId={user.id} />}
          </div>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="rotate-180 -mt-1"
      >
        <path
          fill="#000000"
          fillOpacity="1"
          d="M0,64L48,53.3C96,43,192,21,288,64C384,107,480,213,576,266.7C672,320,768,320,864,304C960,288,1056,256,1152,250.7C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </main>
  );
}
