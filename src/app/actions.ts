"use server"

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string
    const content = formData.get("content") as string

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        return redirect("/api/auth/register")
    }

    await prisma.blogPost.create({
        data: {
            title,
            content,
            authorId: user.id,
            authorImage: user.picture as string,
            authorName: user.given_name as string
        }
    })

    revalidatePath("/")

    return redirect("/dashboard")
};

const deleteBlog = async (id: string) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return redirect("/api/auth/register");
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post || post.authorId !== user.id) throw new Error("Unauthorized");
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/dashboard");
    return redirect("/dashboard");
};

const updateBlog = async (id: string, formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return redirect("/api/auth/register");
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post || post.authorId !== user.id) throw new Error("Unauthorized");
    await prisma.blogPost.update({
        where: { id },
        data: { title, content },
    });
    revalidatePath("/");
    revalidatePath("/dashboard");
    return redirect(`/post/${id}`);
};

export { handleSubmit, deleteBlog, updateBlog };