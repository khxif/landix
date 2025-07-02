import { User } from '@/models/User';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { connectDb } from './lib/utils';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      await connectDb();

      const userExists = await User.findOne({ email: user.email });
      if (!userExists) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },
    async session({ session }) {
      await connectDb();

      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      session.user.name = user.name;
      session.user.image = user.image;

      return session;
    },
  },
});
