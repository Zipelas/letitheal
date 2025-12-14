import { authOptions as options } from '@/app/api/auth/[...nextauth]/route';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';

export const authOptions: NextAuthOptions = options;
export const getSession = () => getServerSession(authOptions);
