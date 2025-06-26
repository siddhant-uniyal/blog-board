import { prisma } from "@/lib/prisma";
import { updateBlog } from "@/app/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BlogForm } from "../../create/page";
import { revalidatePath } from "next/cache";

type Params = Promise<{ id: string }>;

const getData = async (id: string) => {
  return await prisma.blogPost.findUnique({ where: { id } });
};

export default async function EditBlogPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await getData(id);
  if (!post) return notFound();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || post.authorId !== user.id) return redirect("/dashboard");
  return (
    <div>
      <Link href={`/post/${id}`} className={buttonVariants({ variant: "secondary" })}>
        Back to Post
      </Link>
      <div className="max-w-lg mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <BlogForm
          onSubmit={async (formData: FormData) => {
            'use server';
            await updateBlog(id, formData);
            revalidatePath("/")
            revalidatePath("/dashboard")
          }}
          initialTitle={post.title}
          initialContent={post.content}
          submitLabel="Update post"
        />
      </div>
    </div>
  );
} 