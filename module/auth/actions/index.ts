"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
 export const getUserById = async(id:string)=>{
    try{
        const user = await db.user.findUnique({
            where:{id},
            include:{
                accounts:true
            }
        })
        return user
    }catch(error){
        console.log(error + "Error at index.ts in action folder")
        return null
    }
 }

 export const getAccountById = async(userId: string)=>{
    try{
        const accountDetail = await db.account.findFirst({
            where:{userId}
        })
        return accountDetail
    }catch(error){
        console.log(error + "Error at index.ts under action in auth folder")
        return null
    }
 }

 export const currentUser = async()=>{
    const user = await auth()
    return user?.user;
 }