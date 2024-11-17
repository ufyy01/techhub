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
          <Card className="w-fit ms-auto me-10 p-2 md:flex items-center glass">
            <div>
              <ProfileAni />
            </div>
            <div>
              <p>Welcome!</p>
              <p className="text-xl font-semibold">{session.email}</p>
              <div className="flex items-center gap-2">
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
