import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-3 bg-black text-white py-5">
      <Link href={'/'}>
        <Image
          src={
            'https://res.cloudinary.com/daisikwbm/image/upload/v1727061378/TechHubs_upload/logo_ejjcvm.png'
          }
          alt="logo"
          height={120}
          width={120}
          priority
          className="ms-2"
        />
      </Link>
      <p className="italic font-semibold">Discover, Connect, Work.</p>
      <div>
        <ul className="flex gap-4 text-xs">
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/get-hubs'}>Hubs</Link>
          </li>
          <li>
            <Link href={'/account/login'}>Signin</Link>
          </li>
          <li>
            <Link href={'/account/register'}>Signup</Link>
          </li>
        </ul>
      </div>
      <div className="w-9/12 text-center mx-auto text-sm">
        <p className="text-sm font-semibold">Disclaimer:</p>
        <p>
          Hub Radar is an independent platform and is not affiliated with any
          hubs displayed. We do not guarantee the accuracy of the information
          provided by third parties. Users are strongly advised to conduct due
          diligence before visiting or engaging with any hub.
        </p>
        <p className="text-sm font-semibold mt-3">Note:</p>
        <p>
          Hub Radar does not handle bookings or payments for hubs directly. Any
          transactions or agreements are strictly between the user and the hub.
        </p>
        <p>
          For support or inquiries, email us at <span>info@bynstudios.org</span>{' '}
          .
        </p>
      </div>
      <div className="text-xs opacity-50">
        <p>BYN Studios &copy; 2023</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
