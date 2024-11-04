'use client';
import { Button } from '@/components/ui/button';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

const Notfound = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="lg:w-[90vw]">
          <DotLottieReact
            src="https://lottie.host/3561a5d3-3071-452d-9fb2-9a6c5d9e4f32/lOOSqVebEn.json"
            loop
            autoplay
          />
        </div>
        <p className="text-[#fc045c] my-3">Ooops! Something went wrong</p>
        <div className="flex gap-2">
          <Link href="/">
            <Button> ‹‹ Home</Button>
          </Link>
          <Link href="/profile">
            <Button> ‹ Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
