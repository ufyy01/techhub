'use client';
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
import { useEffect, useState } from 'react';
import { Playfair_Display } from 'next/font/google';
import NearMeCard from './nearMeCard';

const playfair = Playfair_Display({
  weight: '600',
  subsets: ['latin'],
  style: 'italic',
});

export interface Hubs {
  data: Hub[];
  pagination: {
    page: number;
    pages: number;
  };
}

interface Hub {
  _id: string;
  name: string;
  username: string;
  password: string;
  images: Array<{
    public_id: string;
    secure_url: string;
  }>;
  address: string;
  state: string;
  schedule: string[];
  dist: {
    calculated: number;
  };
  hubClaimed: boolean;
}

const Nearme = () => {
  const [hubs, setHubs] = useState<Hubs | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHubsNearMe = async (): Promise<Hubs> => {
      const getLocation = async (
        position: GeolocationPosition
      ): Promise<Hubs> => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PROXY_URL}/near-me?lng=${lng}&lat=${lat}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch hubs');
        }

        const data = await res.json();
        return data as Hubs;
      };

      const handleError = (error: GeolocationPositionError): Hubs => {
        console.error('Error getting location', error);
        return {
          data: [],
          pagination: {
            page: 0,
            pages: 0,
          },
        };
      };

      return new Promise<Hubs>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const hubs = await getLocation(position);
                resolve(hubs);
              } catch (error) {
                reject(error);
              }
            },
            (error) => {
              const hubs = handleError(error);
              resolve(hubs);
            }
          );
        } else {
          console.error('Geolocation is not supported by this device.');
          resolve({
            data: [],
            pagination: {
              page: 0,
              pages: 0,
            },
          });
        }
      });
    };

    // Call the function inside useEffect
    const loadHubs = async () => {
      setLoading(true);
      try {
        const hubs = await fetchHubsNearMe();
        setHubs(hubs);
      } catch (err) {
        setError('Failed to load hubs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadHubs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {hubs && hubs.data.length > 0 && (
        <div className="grid place-items-center my-6">
          {hubs.data.map((hub, index) => (
            <NearMeCard
              hub={hub}
              key={hub._id}
              setHubs={setHubs}
              cards={hubs.data}
              index={index}
            />
          ))}
        </div>
      )}
      {hubs && hubs.data.length === 0 && (
        <Alert className="w-6/12">
          <AlertTitle className="text-xl">Heads up!</AlertTitle>
          <AlertDescription className="text-base">
            Kindly allow access to your location to find amazing hubs near you!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Nearme;
