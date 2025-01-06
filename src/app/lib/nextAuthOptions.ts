
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile: (profile) => {
        console.log("Profile in provider:", profile);
        return {
          id: profile.sub || profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("User during JWT callback:", user);
        token.sub = user.id || token.sub;
      }
      console.log("Token after JWT callback:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Token during session callback:", token);
      session.user = {
        ...session.user,
        id: token.sub,
      };
      console.log("Session during session callback:", session);
      return session;
    },
  },
  debug: true,
};
