  import NextAuth, {NextAuthOptions} from "next-auth"
  import {PrismaAdapter} from "@auth/prisma-adapter"
  import { prisma } from "@/lib/db/prisma"
  import GoogleProvider from "next-auth/providers/google"
  import { env } from "@/lib/env"
  import { Adapter } from "next-auth/adapters";
  import { MergeAnonymousCartIntoUserCart } from "@/lib/db/cart"
  import { PrismaClient } from "@prisma/client"

  export const authOptions:NextAuthOptions={
      //this alows us to save user data 
        adapter:PrismaAdapter(prisma as PrismaClient) as Adapter,
        providers:[
          GoogleProvider({
            clientId: env.GOGGLE_CLIENT_ID,
            clientSecret: env.GOGGLE_CLIENT_SECRET,
          })
        ],
        callbacks:{
          session({session, user}){
              session.user.id= user.id;
              return session
          }
        },
        events:{
          async signIn({user}){
            await MergeAnonymousCartIntoUserCart(user.id);
          }
        }
  }                            

  const handler= NextAuth(authOptions);

  export {handler as GET, handler as POST}