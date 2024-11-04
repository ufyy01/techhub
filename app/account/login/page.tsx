import LoginPage from '@/components/LoginForm';
import SliderCards from '@/components/sliderCards';
import SocialLogin from '@/components/SocialLogin';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="md:flex">
      <div className="md:w-6/12 md:order-2">
        <SliderCards
          list={[
            'Explore and manage co-working spaces tailored just for you. ',
            'Log in to access your favorite hubs, discover new spaces, and stay connected with exclusive offers and updates.',
          ]}
          text="Welcome Back!"
          url="https://lottie.host/533bc429-05b9-4ddb-8636-3e1f05d3c580/NzP2baiRSJ.json"
          color="#00a99d"
          side="right"
        />
      </div>
      <div className="md:w-6/12 ms-auto relative top-[90vh] md:top-0 md:flex flex-col justify-center items-center h-screen">
        <LoginPage />
        <SocialLogin action="Login" />
        <div>
          <Link href="/account/register">
            <p className="text-center text-sm text-gray-500 hover:text-gray-700 pb-5">
              Don`t have an account? Register
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
