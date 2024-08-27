import { Hub } from '@/components/nearme';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

async function getHubs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/hub`);

  if (!res.ok) {
    throw new Error('Failed to fetch hubs');
  }

  const data = await res.json();

  return data.data as Hub[];
}

const Page = async () => {
  const hubs = await getHubs();

  return (
    <>
      <p>Hello</p>
      {hubs}
      {/* {hubs.map((hub) => (
        <div key={hub._id}>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Image src={hub.images[0]} alt="hub" width={500} height={500} />
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      ))}
      {hubs.length === 0 && <p>Error loading Hubs. Kindly try again</p>} */}
    </>
  );
};

export default Page;
