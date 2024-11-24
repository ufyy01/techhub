'use client';

import { Button } from './ui/button';
// import { PaystackButton } from 'react-paystack';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Card } from './ui/card';

const AddBtn = ({ email }: { email?: string }) => {
  const router = useRouter();

  // const componentProps = {
  //   email,
  //   amount: 200000,
  //   publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_API_KEY}`,
  //   text: 'Continue',
  //   onSuccess: async () => {
  // router.push(`${process.env.NEXT_PUBLIC_URL}/create-hub`);
  // }
  //
  // };

  const onSuccess = async () => {
    router.push(`${process.env.NEXT_PUBLIC_URL}/create-hub`);
  };
  return (
    <>
      <div className="flex justify-center items-center h-fit">
        <Card className="text-center w-11/12 mx-auto h-fit py-5 flex flex-col justify-center items-center px-8 gap-2">
          <p className="font-semibold text-2xl mb-4">Add Hub</p>
          <p>
            Add and manage hub profile for just <strong>NGN 2,000!</strong>
          </p>
          <ul className="my-3">
            <p>By adding a hub, you have access to these benefits</p>
            <li>
              <strong>Boost Visibility: </strong> Make your hub stand out to
              potential users.
            </li>
            <li>
              <strong>Manage Details: </strong>Update and personalize hub
              information anytime.
            </li>
            <li>
              <strong>Track Engagement: </strong>Access insights to optimize
              your space&#39;s performance.
            </li>
          </ul>
          <p className="text-sm md:text-xs">
            You&#39;ll be redirected to a secure payment platform to complete
            your transaction. Once the payment is confirmed, can proceed to add
            your Hub!
          </p>
          <div className="my-3 flex justify-center">
            {/* <PaystackButton
                    className="paystack-button bg-black rounded-md py-2 px-4 overflow-hidden"
                    {...componentProps}
                    /> */}
            <Button onClick={onSuccess}>Continue</Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddBtn;
