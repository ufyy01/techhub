import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import { connect } from './lib/db';
import User from './lib/Models/user';
import { compare } from 'bcrypt';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new Error('Please provide a valid email and password');
        }

        connect();

        const user = await User.findOne({ email }).select('+password +role');

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error('Invalid credentials');
        }

        const userData = {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
        return userData;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/account/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('USER', user);
      try {
        await connect();
        const { email, name, id } = user;

        if (account?.provider === 'google') {
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            await User.create({ email, name, authProviderId: id });
            return true;
          }
          return true;
        }

        if (account?.provider === 'Credentials') {
          const existingUser = await User.findById(user.id);
          if (!existingUser) {
            return false;
          }
          return true;
        }
        return true;
      } catch (err) {
        console.error('Error in signIn callback:', err);
        throw new Error('Error while creating user account');
      }
    },

    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role as 'admin' | 'manager' | 'user';
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await User.findById(token.sub);
      if (existingUser) {
        token.role = existingUser.role;
      }
      return token;
    },
  },
});
