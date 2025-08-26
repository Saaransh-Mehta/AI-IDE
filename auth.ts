import NextAuth from 'next-auth'
import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from './lib/db'
import authConfig from './auth.config'
import { userAgent } from 'next/server'
import { getUserById } from './module/auth/actions'

 export const {handlers, signIn, signOut, auth} = NextAuth({
   callbacks: {
  async signIn({ user, account }) {
    if (!user || !account) return false;

    // Adapter will handle account linking automatically
    return true;
  },
  async jwt({ token }) {
    if (!token.sub) return token;
    const exisitngUser = await getUserById(token.sub);
    if (!exisitngUser) return token;

    token.name = exisitngUser.name;
    token.email = exisitngUser.email;
    token.role = exisitngUser?.role;
    return token;
  },
  async session({ session, token }) {
    if (token && token.sub && session.user) {
      session.user.id = token.sub;
      // @ts-ignore
      session.user.role = token.role;
    }
    return session;
  },
},

    secret:process.env.NEXTAUTH_SECRET,
    adapter:PrismaAdapter(db),
    ...authConfig
 })

// //   callbacks:{
//       async signIn({user,account}){
//          if(!user || !account){
//             return false
//          }
//          const existingUser= await db.user.findUnique({
//             where:{email:user.email!}

//          })
//          if(!existingUser){
//             const newUser = await db.user.create({
//                data:{
//                   email:user.email!,
//                   name:user.name,
//                   image:user.image,
//                   accounts:{
//                      create:{
//                         type: account.type,
//                         provider: account.provider,
//                         providerAccountId: account.providerAccountId,
//                         refresh_token:account.refresh_token,
//                         access_token:account.access_token,
//                         expires_at:account.expires_at,
//                         token_type:account.token_type,
//                         scope:account.scope,
//                         id_token:account.id_token,
                        
//                      }
//                   }
//                }
//             })
//             if(!newUser){
//                return false   
//             }
//          }else{
//             const existingAccount = await db.account.findUnique({
//                where: {
//                   provider_providerAccountId: {
//                      provider: account.provider,
//                      providerAccountId: account.providerAccountId
//                   }
//                }
//             })
//             if(!existingAccount){
//                const newAccount = await db.account.create({
//                   data:{
//                      userId:existingUser.id,
//                      type:account.type,
//                      provider:account.provider,
//                      refresh_token:account.refresh_token,
//                      providerAccountId:account.providerAccountId,
//                      access_token:account.access_token,
//                      expires_at:account.expires_at,
//                      scope:account.scope,
//                      id_token:account.id_token,
//                      session_state: account?.session_state !== undefined ? String(account.session_state) : undefined
//                   }
//                })
//             }
//          }
//          return true
        
//       },
//       async jwt({token}){
//          if(!token.sub){
//             return token
//          }
//          const exisitngUser = await getUserById(token.sub)
//          if(!exisitngUser) return token;

//          token.name = exisitngUser.name
//          token.email = exisitngUser.email
//          token.role = exisitngUser?.role

//          return token

//       },
//       async session({session,token}){
//          if(token && token.sub && session.user){
//             session.user.id = token.sub
//             // @ts-ignore
//             session.user.role = token.role
//          }
//          return session
//       },

//     },