'use client';

import { useEffect, useState } from 'react';
import { hasCookie, setCookie } from 'cookies-next';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

const CookiesConsent = () => {
  const [allowCookie, setAllowCookie] = useState(true);

  useEffect(() => {
    setAllowCookie(hasCookie('localConsent'));
  }, []);

  const acceptCookie = () => {
    setCookie('localConsent', 'true', {});
    setAllowCookie(true);
  };

  if (allowCookie) return null;

  return (
    <Drawer
      open={!allowCookie}
      onOpenChange={setAllowCookie}
      onDrag={() => setAllowCookie(true)}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-semibold text-center">
            We Use Cookies
          </DrawerTitle>
          <DrawerDescription>
            <div className="flex justify-center my-4">
              <Icon icon="unjs:cookie-es" className="text-7xl" />
            </div>
            <div className="w-10/12 mx-auto text-center">
              At Hub Radar, we use cookies to improve your experience by
              personalizing content, saving your preferences, and enabling
              location-based services. By clicking &#34;Accept,&#34; you agree
              to the use of these cookies. You can decline if you prefer not to
              share your data. For more information on how we use cookies,
              please contact us.
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button type="button" onClick={() => acceptCookie()}>
            Accept
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CookiesConsent;
