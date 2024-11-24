import GetClaimed from '@/components/getClaimed';
import GetFavs from '@/components/getFavs';
import ProfileAni from '@/components/profileAni';
import { Card } from '@/components/ui/card';
import UpdateRole from '@/components/updateRole';
import { getSession } from '@/getSession';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getSession();
  if (!session) redirect('/account/login');
  const user = {
    email: session.email,
    role: session.role,
  };
  return (
    <>
      {session && (
        <>
          <Card className="w-11/12 md:w-9/12 mx-auto p-2 md:flex items-center glass">
            <div className="w-full md:w-5/12">
              <ProfileAni />
            </div>
            <div className="text-center">
              <p>Welcome!</p>
              <p className="text-xl font-semibold">{session.email}</p>
              <div className="flex items-center gap-2 justify-center">
                <UpdateRole user={user} />
                <p>Role: {session.role.toUpperCase()}</p>
              </div>
            </div>
          </Card>
          {session && session.role === 'user' && <GetFavs />}
          {session && session.role === 'manager' && <GetClaimed />}
        </>
      )}
    </>
  );
};

export default Page;
