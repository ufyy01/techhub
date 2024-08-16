'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Hubs {
  _id: string;
  name: string;
  username: string;
  password: string;
  images: [string];
  address: string;
  state: string;
  schedule: [
    {
      day:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday';
      openingTime: string;
      closingTime: string;
    },
  ];
  dist: {
    calculated: number;
  };
  hubClaimed: false;
}

const Nearme = () => {
  const [hubsNearMe, setHubsNearMe] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getLocation = async (position: any) => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PROXY_URL}/near-me?lng=${lng}&lat=${lat}`
      );

      const data = await res.json();

      setHubsNearMe(data.data);
    };

    const handleError = (error: any) => {
      setError(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocation, handleError);
    } else {
      console.error('Geolocation is not supported by this device.');
    }
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>See hubs near you</p>

      {hubsNearMe && hubsNearMe.length > 0 ? (
        <Carousel className="w-6/12 h-2/5 mx-auto">
          <CarouselContent>
            {hubsNearMe.map((hub: Hubs) => (
              <CarouselItem key={hub._id}>
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Image
                        src={hub.images[0]}
                        alt="hub"
                        width={500}
                        height={500}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <Alert className="w-6/12">
          <AlertTitle className="text-xl">Heads up!</AlertTitle>
          <AlertDescription className="text-red-600 italic">
            {error}
          </AlertDescription>
          <AlertDescription className="text-base">
            Kindly allow access to your location to find amazing hubs near you!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Nearme;
