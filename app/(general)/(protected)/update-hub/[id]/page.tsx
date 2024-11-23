import UpdateForm from '@/components/updateHubForm';
import { getSession } from '@/getSession';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';

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
  const user = await getSession();
  if (!user) redirect('/account/login');

  return (
    <div>
      <UpdateForm hub={hub.data} />
    </div>
  );
};

export default Page;
