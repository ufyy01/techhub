import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: 'admin' | 'user' | 'manager';
  refresh: boolean;
};
declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
