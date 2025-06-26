"use server"

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const handleSubmit = async (formData : FormData) => {

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const url = formData.get("url") as string

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user){
        return redirect("/api/auth/register")
    }

    await prisma.blogPost.create({
        data: {
            title,
            content,
            imageUrl: url,
            authorId: user.id, 
            authorImage: user.picture as string, 
            authorName: user.given_name as string
        }
    })

    revalidatePath("/")

    return redirect("/dashboard")
};


export { handleSubmit }