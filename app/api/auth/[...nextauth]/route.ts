import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';
import argon2 from 'argon2';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const runtime = 'nodejs';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await dbConnect();
        const user = await User.findOne({ email: credentials.email }).lean();
        if (!user || !user.passwordHash) return null;
        const ok = await argon2.verify(user.passwordHash, credentials.password);
        if (!ok) return null;
        return { id: String(user._id), name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
