import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const user = await prisma.user.findFirst({ where: { username: credentials?.username } })

        if (!user) {
          throw new Error("User not found")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials?.password as string, user?.password as string)

        if (!isPasswordCorrect) {
          throw new Error("User not found")
        }

        return { id: user.id, username: user.username, full_name: user.full_name, address: user.address as string, role: user.role, phone_number: user.phone_number as string }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          address: user.address,
          role: user.role,
          phone_number: user.phone_number,
        };
      }

      return token;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: { id: token.id as number },
        select: {
          id: true,
          username: true,
          full_name: true,
          address: true,
          role: true,
          phone_number: true,
        },
      });

      if (user) {
        session.user = {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          address: user.address as string,
          role: user.role,
          phone_number: user.phone_number as string,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}


export default NextAuth(authOptions);
