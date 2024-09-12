import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const getHub = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/hub/${id}`, {
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    notFound();
  }
  const data = res.json();
  return data;
};

const Page = async ({ params }: { params: any }) => {
  const id = params.id;

  const hub = await getHub(id);

  return (
    <div>
      <Card className="rounded-2xl border border-white my-6 w-11/12 h-[800px] lg:h-[1000px] mx-auto relative">
        <div>
          <Image
            src={hub.data.images[0]['secure_url']}
            alt="hub"
            priority
            fill
            className="rounded-2xl p-2"
          />
        </div>
        <div className="glass w-11/12 h-2/4 absolute bottom-2 left-3.5 lg:left-14 rounded-3xl">
          Details
        </div>
      </Card>
    </div>
  );
};

export default Page;
