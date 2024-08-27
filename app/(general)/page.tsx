import Nearme from '@/components/nearme';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});

export default function Home() {
  return (
    <main>
      <Nearme />
      <Link href="/get-hubs">
        <Button className={`${playfair.className} text-lg`}>
          Explore Hubs
        </Button>
      </Link>
    </main>
  );
}
