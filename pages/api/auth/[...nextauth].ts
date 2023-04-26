import { client } from "@/prisma/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(client),
  providers:[
    GithubProvider({
      clientId:process.env.GITHUB_ID as string,
      clientSecret:process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_IS as string,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name:'credentials',
      credentials:{
        email:{label:'email', type :'text'},//PUESE EMAIL EN EL CAMPO DEL FORMULARIO A DIFERENCIA DEL VIDEO
        password:{label:'password',type:'password'}
      },
      async authorize(credentials){
        if (!credentials?.email || !credentials?.password) {
          throw new Error("invalid credentials");
        }
        const user = await prisma?.user.findUnique({
          where:{email:credentials.email}
        })
        if(!user  || !user.hashedPassword)
        throw new Error('invalid credentials')
        const isCorrectPassword = await compare(credentials.password,user.hashedPassword)
        if (!isCorrectPassword) {
          throw new Error('invalid credentials')
        }
        return user
      }
    },
    )
  ],
  pages:{
    signIn:'/'
  },
  debug:process.env.NODE_ENV==='development',
  session:{
    strategy:'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET
  }
  export default NextAuth(authOptions)