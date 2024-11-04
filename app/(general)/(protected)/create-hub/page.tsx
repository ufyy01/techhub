import CreateForm from '@/components/createHubForm';
import { getSession } from '@/getSession';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getSession();

  if (!session) redirect('/account/login');
  return (
    <>
      <CreateForm />
    </>
  );
};

export default Page;
