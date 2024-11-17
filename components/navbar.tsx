import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getSession } from '@/getSession';
import LogoutForm from './logoutForm';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const Navbar = async () => {
  const session = await getSession();
  return (
    <nav className="flex justify-between items-center p-2 mx-auto lg:w-11/12">
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
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost">
              <Icon icon="subway:menu" className="text-[#fc045c]" />
              <span className="sr-only">menu</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="lg:w-8/12 w-6/12">
            <div className="flex flex-wrap gap-2 text-center justify-center">
              <Link href="/profile">
                <Button className="text-sm shadow-md" variant="outline">
                  <Icon
                    icon="iconamoon:profile-circle-fill"
                    className="me-2 text-[#fc045c]"
                  />
                  Profile
                </Button>
              </Link>
              <Link href="/get-hubs">
                <Button className="text-sm shadow-md" variant="outline">
                  <Icon
                    icon="ph:building-office"
                    className="me-2 text-[#fc045c]"
                  />
                  Hubs
                </Button>
              </Link>
              <Link href="/create-hub">
                <Button className="text-sm shadow-md" variant="outline">
                  <Icon
                    icon="ph:building-office"
                    className="me-2 text-[#fc045c]"
                  />
                  Add Hub
                </Button>
              </Link>
              {!session && (
                <>
                  <Link href="/account/login">
                    <Button className="text-sm shadow-md" variant="outline">
                      <Icon
                        icon="material-symbols:tv-signin-outline"
                        className="me-2 text-[#fc045c]"
                      />
                      Login
                    </Button>
                  </Link>
                  <Link href="/account/register">
                    <Button className="text-sm shadow-md" variant="outline">
                      <Icon
                        icon="mdi:register"
                        className="me-2 text-[#fc045c]"
                      />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              {session && <LogoutForm />}
            </div>
          </PopoverContent>
        </Popover> */}
        <Dialog>
          <DialogTrigger>
            <Button size="icon" type="button" variant="ghost">
              <Icon icon="subway:menu" className="text-[#fc045c]" />
              <span className="sr-only">menu</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:w-8/12 w-6/12">
            <div className="flex flex-wrap gap-2 text-center justify-center">
              <Link href="/profile">
                <DialogClose>
                  <Button
                    className="text-sm shadow-md"
                    type="button"
                    variant="outline"
                  >
                    <Icon
                      icon="iconamoon:profile-circle-fill"
                      className="me-2 text-[#fc045c]"
                    />
                    Profile
                  </Button>
                </DialogClose>
              </Link>
              <Link href="/get-hubs">
                <DialogClose>
                  <Button
                    className="text-sm shadow-md"
                    type="button"
                    variant="outline"
                  >
                    <Icon
                      icon="ph:building-office"
                      className="me-2 text-[#fc045c]"
                    />
                    Hubs
                  </Button>
                </DialogClose>
              </Link>
              <Link href="/create-hub">
                <DialogClose>
                  <Button
                    className="text-sm shadow-md"
                    type="button"
                    variant="outline"
                  >
                    <Icon
                      icon="ph:building-office"
                      className="me-2 text-[#fc045c]"
                    />
                    Add Hub
                  </Button>
                </DialogClose>
              </Link>
              {!session && (
                <>
                  <Link href="/account/login">
                    <DialogClose>
                      <Button
                        className="text-sm shadow-md"
                        type="button"
                        variant="outline"
                      >
                        <Icon
                          icon="material-symbols:tv-signin-outline"
                          className="me-2 text-[#fc045c]"
                        />
                        Login
                      </Button>
                    </DialogClose>
                  </Link>
                  <Link href="/account/register">
                    <DialogClose>
                      <Button
                        className="text-sm shadow-md"
                        type="button"
                        variant="outline"
                      >
                        <Icon
                          icon="mdi:register"
                          className="me-2 text-[#fc045c]"
                        />
                        Sign Up
                      </Button>
                    </DialogClose>
                  </Link>
                </>
              )}
              {session && (
                <DialogClose>
                  <LogoutForm />
                </DialogClose>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
