"use server"

import { db } from "@/lib/db"
import { currentUser } from "@/module/auth/actions"

export const getAllPlayGroundForUser = async()=>{
    const user = await currentUser()
     try{
        const playground = await db.playground.findMany({
            where:{userId:user?.id},
            include:{
                user:true
            }
        })
        return playground
     }catch(error){
        console.log(error)
     }
}