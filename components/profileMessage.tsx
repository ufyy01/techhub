import { getSession } from '@/getSession';
import React from 'react';
import { Hubs } from './nearme';
import { FavHub } from './favoriteSlide';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { Button } from './ui/button';

const ProfileMessage = async ({ hubs }: { hubs: Hubs | FavHub }) => {
  const user = await getSession();

  return (
    <>
      {user?.role === 'manager' && !hubs.data && (
        <div className="pb-8">
          <Alert className="w-9/12 mx-auto mt-5">
            <AlertTitle className="text-xl text-center font-semibold">
              You&#39;ve not claimed any hub yet 😒!
            </AlertTitle>
            <AlertDescription className="text-base flex flex-col items-center text-center">
              <Icon
                icon="mingcute:search-ai-fill"
                style={{ width: '50', height: '50' }}
              />
              <div>
                Claim a hub or create a new one now to manage hub profile!
                <div className="flex justify-center gap-3">
                  <Link href="/get-hubs" className="block mt-2">
                    <Button>Find Hub</Button>
                  </Link>
                  <Link href="/create-hub" className="block mt-2">
                    <Button>Create New</Button>
                  </Link>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
      {user?.role === 'user' && !hubs.data && (
        <div className="pb-8">
          <Alert className="w-9/12 mx-auto mt-5">
            <AlertTitle className="text-xl text-center font-semibold">
              You&#39;ve not added any hub to your favorite 😒!
            </AlertTitle>
            <AlertDescription className="text-base flex flex-col items-center text-center">
              <Icon
                icon="mingcute:search-ai-fill"
                style={{ width: '50', height: '50' }}
              />
              Discover more amazing co-working spaces here.
              <Link href="/get-hubs" className="block mt-2">
                <Button>Find More</Button>
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default ProfileMessage;
