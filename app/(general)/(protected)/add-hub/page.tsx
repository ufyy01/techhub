import AddBtn from '@/components/addHub';
import { getSession } from '@/getSession';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getSession();

  if (!session) redirect('/account/login');
  return <>{session.email && <AddBtn email={session.email} />}</>;
};

export default Page;
