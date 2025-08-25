import NextAuth from "next-auth";

import {
    protectedRoutes,
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes
} from '@/routes'

import authConfig from "./auth.config";


const {auth} = NextAuth(authConfig)

export default auth((req)=>{
    const {nextUrl} = req
    const isLoggedIn = !!req.auth
    
})