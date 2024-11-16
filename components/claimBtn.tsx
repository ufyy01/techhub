'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { PaystackButton } from 'react-paystack';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const ClaimBtn = ({
  email,
  userId,
  hubId,
}: {
  email: string;
  userId: string;
  hubId: string;
}) => {
  const router = useRouter();

  // const componentProps = {
  //   email,
  //   amount: 200000,
  //   publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_API_KEY}`,
  //   text: 'Continue',
  //   onSuccess: async () => {
  //     const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/claim?userId=${userId}&hubId=${hubId}`;

  //     const res = await fetch(base, {
  //       method: 'PATCH',
  //     });
  //     const data = await res.json();
  //     if (data.status === 200) {
  //       router.push(`${process.env.NEXT_PUBLIC_URL}/profile`);
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         text: `${data.message}. Please contact support for more information`,
  //         showConfirmButton: false,
  //         showCancelButton: false,
  //         timer: 1500,
  //         showClass: {
  //           popup: `
  //             animate__animated
  //             animate__fadeInUp
  //             animate__faster
  //           `,
  //         },
  //         hideClass: {
  //           popup: `
  //             animate__animated
  //             animate__fadeOutDown
  //             animate__faster
  //           `,
  //         },
  //       });
  //     }
  //   },
  // };

  const onSuccess = async () => {
    const base = `${process.env.NEXT_PUBLIC_PROXY_URL}/claim?userId=${userId}&hubId=${hubId}`;

    const res = await fetch(base, {
      method: 'PATCH',
    });
    const data = await res.json();
    console.log({ data });
    if (data.message === 'Hub Claimed!') {
      router.push(`${process.env.NEXT_PUBLIC_URL}/profile`);
    } else {
      Swal.fire({
        icon: 'error',
        text: `${data.message}. Please contact support for more information`,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 2500,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Claim Hub</Button>
        </DialogTrigger>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle className="text-center text-white mb-3">
              Claim Hub
            </DialogTitle>
            <DialogDescription className="text-center w-11/12 mx-auto text-white">
              <p>
                Take ownership of this hub for just <strong>NGN 2,000!</strong>
              </p>
              <ul className="my-3">
                <p>By claming this hub, you unlock these benefits</p>
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
                You&#39;ll be redirected to a secure payment platform to
                complete your transaction. Once the payment is confirmed, your
                claim will be finalized.
              </p>
              <div className="my-3 flex justify-center">
                <DialogClose asChild>
                  {/* <PaystackButton
                    className="paystack-button bg-black rounded-md py-2 px-4 overflow-hidden"
                    {...componentProps}
                    /> */}
                  <Button onClick={onSuccess}>Continue</Button>
                </DialogClose>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClaimBtn;
