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
import Link from 'next/link';
import { Button } from './ui/button';

export interface Hub {
  _id: string;
  name: string;
  username: string;
  password: string;
  images: [string];
  address: string;
  state: string;
  schedule: [string];
  dist: {
    calculated: number;
  };
  hubClaimed: false;
}

const Nearme = () => {
  const [hubsNearMe, setHubsNearMe] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHubsNearMe = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lng = position.coords.longitude;
              const lat = position.coords.latitude;

              const res = await fetch(`/api/hub`);

              if (!res.ok) {
                throw new Error('Failed to fetch hubs');
              }

              const data = await res.json();
              setHubsNearMe(data.data || []);
            },
            (error) => {
              setError(error.message);
            }
          );
        } else {
          console.error('Geolocation is not supported by this device.');
          setError('Geolocation is not supported by this device.');
        }
      } catch (err) {
        console.error('An unexpected error occurred:', err);
        setError('An unexpected error occurred.');
      }
    };

    fetchHubsNearMe();
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>See hubs near you</p>

      {/* {hubsNearMe && hubsNearMe.length > 0 ? (
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
      )} */}

      {hubsNearMe}
    </div>
  );
};

export default Nearme;
