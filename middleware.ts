import NextAuth from "next-auth";

import {
    protectedRoutes,
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes
} from '@/routes'

import authConfig from "./auth.config";
import { redirect } from "next/dist/server/api-utils";
import { url } from "inspector";


const {auth} = NextAuth(authConfig)

export default auth((req)=>{
    const {nextUrl} = req
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublic = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)



    if(isApiAuthRoute){
         return null
    }
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return null
    }

    if(!isLoggedIn && !isPublic){
        return Response.redirect(new URL("/auth/signin",nextUrl))
    }
return null
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};