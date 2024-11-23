'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import NearMeCard from './nearMeCard';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Grid } from 'react-loader-spinner';
import { hasCookie } from 'cookies-next';
import { useHubsStore } from '@/lib/Stores/hubsStore';

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
  images: Array<{
    secure_url: string;
  }>;
  state: string;
  dist: {
    calculated: number;
  };
}

const Nearme = () => {
  const { setHubs, hubs } = useHubsStore();
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

    if (!sessionStorage.getItem('hubs-session-storage')) {
      const timer = setTimeout(() => {
        if (hasCookie('localConsent')) {
          const loadHubs = async () => {
            setLoading(true);
            try {
              const hubs = await fetchHubsNearMe();
              setHubs(hubs.data);
            } catch (err) {
              setError('Failed to load hubs');
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
          loadHubs();
        } else {
          setError(
            'Local consent not given. Please accept the terms and conditions.'
          );
          setLoading(false);
        }
      }, 3000); // 3 seconds delay
      return () => clearTimeout(timer);
    }
    setLoading(false);

    // Cleanup timeout on component unmount
  }, [setHubs]);

  if (loading)
    return (
      <div className="h-[40vh] flex justify-center items-center">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#fc045c"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );

  return (
    <div>
      {hubs && hubs.length > 0 && (
        <div className="grid place-items-center mt-8 h-full grid-cols-1 pb-8">
          {hubs.map((hub, index) => (
            <NearMeCard hub={hub} key={hub._id} cards={hubs} index={index} />
          ))}
        </div>
      )}
      {hubs && hubs.length === 0 && (
        <div className="pb-8">
          <Alert className="w-9/12 mx-auto">
            <AlertTitle className="text-xl text-center font-semibold">
              Find More!
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
      {error && (
        <div className="pb-8">
          <Alert className="w-9/12 mx-auto">
            <AlertTitle className="text-xl text-center font-semibold">
              Oops!
            </AlertTitle>
            <AlertDescription className="text-base flex flex-col items-center text-center">
              <Icon
                icon="gis:map-search"
                style={{ width: '50', height: '50' }}
              />
              Something went wrong. Kindly allow access to your location to find
              amazing hubs near you! Browse through all hubs 👇.
              <Link href="/get-hubs" className="block mt-2">
                <Button>Find More</Button>
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Nearme;
