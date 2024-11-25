'use server';

import * as z from 'zod';

import { signIn, signOut } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes';
import { LoginSchema } from '@/lib/Schemas/LoginSchema';
import { AuthError } from 'next-auth';

export const doSocialLogin = async (data: FormData) => {
  const action = data.get('action');
  await signIn('google', { redirectTo: DEFAULT_LOGIN_REDIRECT_URL });
};

export const doLogout = async () => {
  await signOut({ redirectTo: '/' });
};

export const doLogin = async (data: z.infer<typeof LoginSchema>) => {
  const validated = LoginSchema.safeParse(data);

  if (!validated.success) {
    return { error: 'Invalid login' };
  }

  const { email, password } = validated.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
};
