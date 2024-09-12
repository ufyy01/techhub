import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
// import nodemailer from 'nodemailer';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LocationResponse =
  | { error: string; coordinates?: undefined }
  | { coordinates: { lat: number; lng: number }; error?: undefined };

export const getLocation = async (
  address: string
): Promise<LocationResponse> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
      console.error('Location not found');
      return { error: 'Location not found' };
    }

    const coordinates = data.results[0].geometry.location;
    console.log(coordinates);

    return { coordinates };
  } catch (error) {
    console.error('Error fetching location:', error);
    return { error: 'Failed to fetch location' };
  }
};

export const verfyEmail = (name: string, email: string) => {
  const reg =
    /^([a-z/d-]+)@([^(gmail|yahoo|hotmail|aol|msn|ymail|live|icloud)])\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const checkName = name.toLowerCase().replace(/[^a-z\d-]/g, '');

  if (email.includes(checkName) || reg.test(email)) {
    return email;
  }
};

// export const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
// });
