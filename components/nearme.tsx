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

const fetchHubsNearMe = async (): Promise<Hub[]> => {
  const getLocation = async (position: GeolocationPosition): Promise<Hub[]> => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PROXY_URL}/near-me?lng=${lng}&lat=${lat}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch hubs');
    }

    const data = await res.json();
    return data as Hub[];
  };

  const handleError = (error: GeolocationPositionError): Hub[] => {
    console.error('Error getting location', error);
    return [];
  };

  return new Promise<Hub[]>((resolve, reject) => {
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
      resolve([]);
    }
  });
};

const Nearme = async () => {
  const hubsNearMe = await fetchHubsNearMe();

  return (
    <div>
      <h1>Welcome!</h1>
      <p>See hubs near you</p>
      <Carousel className="w-6/12 h-2/5 mx-auto">
        <CarouselContent>
          {hubsNearMe.map((hub: Hub) => (
            <CarouselItem key={hub._id}>
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
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
      {hubsNearMe.length === 0 && (
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
