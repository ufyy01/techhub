import Nearme from '@/components/nearme';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { Card } from '@/components/ui/card';

const playfair = Playfair_Display({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});

export default function Home() {
  return (
    <main className="h-screen">
      <Card className="rounded-2xl border border-white w-11/12 mb-3 mx-auto pb-5 py-3 shadow-lg">
        <div className="text-center my-4">
          <h1
            className={`${playfair.className} text-2xl md:text-3xl text-[#fc045c] mb-3`}
          >
            Welcome to Hub Radar!
          </h1>
          <p className="pb-5">
            Discover the perfect co-working space near you. Swipe through hubs
            around your location or explore all available options. Whether
            you&#39;re looking for a creative atmosphere, top-notch amenities,
            or a quiet spot to get things done, we&#39;ve got the ideal hub for
            your productivity needs. Start exploring now! 👌
          </p>
        </div>
        <Nearme />
      </Card>
      {/* <Link href="/get-hubs">
        <Button className={`${playfair.className} text-lg`}>
          Explore Hubs
        </Button>
      </Link> */}
    </main>
  );
}
