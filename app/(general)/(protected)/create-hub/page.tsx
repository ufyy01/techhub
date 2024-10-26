import CreateForm from '@/components/createHubForm';
import { getSession } from '@/getSession';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect('/account/login');
  return (
    <>
      <CreateForm />
    </>
  );
};

export default Page;
