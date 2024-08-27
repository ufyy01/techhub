import Image from 'next/image';
import Search from './search';
import Logo from '../public/logo.png';
import { Button } from './ui/button';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});

const Navbar = () => {
  return (
    <header className="sticky top-0 w-11/12 mx-auto z-50 mb-8">
      <nav className="flex justify-between items-center py-3 h-20 md:h-24 lg:h-32 gap-5 px-4 glass z-50 rounded-full">
        <div>
          <Image src={Logo} alt="logo" height={120} width={120} priority />
        </div>
        <Search />
        <Link href="/create-hub">
          <Button className={`${playfair.className} text-lg`}>Add Hub</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
