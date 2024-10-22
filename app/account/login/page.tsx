import LoginPage from '@/components/LoginForm';
import SocialLogin from '@/components/SocialLogin';

const Page = () => {
  return (
    <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-lg px-8 py-3 mt-10">
      <LoginPage />
      <SocialLogin />
    </div>
  );
};

export default Page;
