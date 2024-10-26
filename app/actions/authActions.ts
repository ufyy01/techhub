'use server';

import { signIn, signOut } from '@/auth';
import axios from 'axios';

export const doSocialLogin = async (data: FormData) => {
  const action = data.get('action');
  await signIn('google', { redirectTo: '/' });
};

export const doLogout = async () => {
  await signOut({ redirectTo: '/' });
};

export const doLogin = async (data: FormData) => {
  try {
    const response = await signIn('Credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
    });
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};
