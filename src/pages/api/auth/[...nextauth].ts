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

        const isPasswordCorrect = bcrypt.compare(credentials?.password as string, user?.password as string)


        if (!isPasswordCorrect) {
          throw new Error("User not found")
        }

        return { id: user.id.toString(), username: user.username, full_name: user.full_name, address: user.address, role: user.role, phone_number: user.phone_number }
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
      session.user = {
        id: token.id as string,
        username: token.username as string,
        full_name: token.full_name as string,
        address: token.address as string,
        role: token.role as string,
        phone_number: token.phone_number as string,
      };
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
