import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import { Hub } from './Models/hub';
// import nodemailer from 'nodemailer';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocation = async (address: string) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.API_KEY}`
  );
  const data = response.data;

  if (!data || data.status === 'ZERO_RESULT')
    throw new Error('Location not found');

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

export const verfyEmail = (email: string, hub: Hub): boolean => {
  const reg =
    /^([a-z/d-]+)@([^(gmail|yahoo|hotmail|aol|msn|ymail|live|icloud)])\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const name = hub.name.toLowerCase().replace(/[^a-z\d-]/g, '');

  if (email.includes(name) || reg.test(email)) {
    return true;
  }

  return false;
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
