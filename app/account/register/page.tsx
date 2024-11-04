import RegisterPage from '@/components/registerForm';
import RegisterSlider from '@/components/registerSlider';
import SocialLogin from '@/components/SocialLogin';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className="md:flex">
      <div className="md:w-6/12">
        <RegisterSlider />
      </div>
      <div className="md:w-6/12 ms-auto relative top-[90vh] md:top-0 md:flex flex-col justify-center items-center h-screen">
        <RegisterPage />
        <div>
          <SocialLogin action="Register" />
        </div>
        <div>
          <Link href="/account/login">
            <p className="text-center text-sm text-gray-500 hover:text-gray-700 pb-5">
              Already have an account? Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
