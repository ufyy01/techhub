import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';
import { connect } from './lib/db';
import User from './lib/Models/user';
import { compare } from 'bcrypt';
import { authConfig } from './auth.config';
import { LoginSchema } from './lib/Schemas/LoginSchema';

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
        const validated = LoginSchema.safeParse(credentials);
        if (validated.success) {
          const { email, password } = validated.data;
          connect();
          const user = await User.findOne({ email }).select('+password +role');
          if (!user || !user.password) return null;
          const isMatched = await compare(password, user.password);
          if (isMatched) return user;
        }
        return null;
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
    error: '/account/error',
  },
  callbacks: {
    async signIn({ user, account }) {
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
          const existingUser = await User.findOne({ email });
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
        session.user.id = token.id as string;
        session.user.role = token.role as 'admin' | 'manager' | 'user';
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.role || token.refresh) {
        const existingUser = await User.findOne({ email: token.email });
        if (existingUser) {
          token.role = existingUser.role;
          token.id = existingUser._id;
          token.refresh = false;
        }
      }

      if (token.role && token.id) {
        token.refresh = true;
        return token;
      }

      if (!token.sub) return token;

      return token;
    },
  },
});
