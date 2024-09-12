import Image from 'next/image';
import Logo from '../public/logo.png';
import { Button } from './ui/button';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { ModeToggle } from './themeToggle';

const playfair = Playfair_Display({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});

const Navbar = () => {
  return (
    <header className="sticky top-2 w-11/12 md:w-9/12 mx-auto mb-8 z-50 rounded-full glass">
      <nav className="flex justify-between items-center py-2 h-20 gap-5 px-4 w-fit md:w-9/12 mx-auto">
        <Link href={'/'}>
          <Image
            src={Logo}
            alt="logo"
            height={70}
            width={70}
            priority
            className="mt-2"
          />
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/create-hub">
            <Button className={`${playfair.className} text-lg`}>Add Hub</Button>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
