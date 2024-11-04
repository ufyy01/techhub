import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { ModeToggle } from './themeToggle';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const playfair = Playfair_Display({
  weight: '500',
  subsets: ['latin'],
  style: 'italic',
});

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-2 mx-auto">
      <Link href={'/'}>
        <Image
          src={
            'https://res.cloudinary.com/daisikwbm/image/upload/v1727061378/TechHubs_upload/logo_ejjcvm.png'
          }
          alt="logo"
          height={80}
          width={80}
          priority
          className="ms-2"
        />
      </Link>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost">
              <Icon icon="subway:menu" className="text-[#fc045c]" />
              <span className="sr-only">menu</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="lg:w-8/12 w-6/12">
            <div className="flex flex-wrap gap-2 text-center justify-center">
              <Link href="/account/profile">
                <Button
                  className={`${playfair.className} text-sm shadow-md`}
                  variant="outline"
                >
                  <Icon
                    icon="iconamoon:profile-circle-fill"
                    className="me-2 text-[#fc045c]"
                  />
                  Profile
                </Button>
              </Link>
              <Link href="/get-hubs">
                <Button
                  className={`${playfair.className} text-sm shadow-md`}
                  variant="outline"
                >
                  <Icon
                    icon="ph:building-office"
                    className="me-2 text-[#fc045c]"
                  />
                  Hubs
                </Button>
              </Link>
              <Link href="/create-hub">
                <Button
                  className={`${playfair.className} text-sm shadow-md`}
                  variant="outline"
                >
                  <Icon
                    icon="ph:building-office"
                    className="me-2 text-[#fc045c]"
                  />
                  Add Hub
                </Button>
              </Link>
              <Link href="/account/login">
                <Button
                  className={`${playfair.className} text-sm shadow-md`}
                  variant="outline"
                >
                  <Icon
                    icon="material-symbols:tv-signin-outline"
                    className="me-2 text-[#fc045c]"
                  />
                  Login
                </Button>
              </Link>
              <Link href="/account/register">
                <Button
                  className={`${playfair.className} text-sm shadow-md`}
                  variant="outline"
                >
                  <Icon icon="mdi:register" className="me-2 text-[#fc045c]" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
