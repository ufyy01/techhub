import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: 'admin' | 'user' | 'manager';
};
declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
