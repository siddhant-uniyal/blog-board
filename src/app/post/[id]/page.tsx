import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { deleteBlog } from "@/app/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const getData = async (id: string) => {
  const data = await prisma.blogPost.findUnique({
    where: {
      id,
    },
  });
  if (!data) return notFound();
  return data;
};

type Params = Promise<{ id: string }>;

const IdRoute = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const data = await getData(id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAuthor = user && data.authorId === user.id;
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link
        className={buttonVariants({ variant: "secondary" })}
        href="/"
      >
        Back to Posts
      </Link>
      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              ></Image>
            </div>
            <p className="font-medium">{data.authorName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(data.createdAt)}
          </p>
        </div>
        {isAuthor && (
          <div className="flex gap-2 mt-4">
            <Link href={`/dashboard/edit/${data.id}`}>
              <button className={buttonVariants({ variant: "outline", size: "sm" })}>Edit</button>
            </Link>
            <form action={async () => { 'use server'; await deleteBlog(data.id); }}>
              <button className={buttonVariants({ variant: "destructive", size: "sm" })} type="submit">Delete</button>
            </form>
          </div>
        )}
      </div>
      <Card>
        <CardContent>
            <p className="text-gray-700">{data.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdRoute;
