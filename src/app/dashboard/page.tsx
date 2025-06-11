import BlogCard from "@/components/general/BlogCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React from "react";

const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return [];

  const data = await prisma.blogPost.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

const DashboardRoute = async () => {
  const data = await getData();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link href="/dashboard/create" className={buttonVariants()}>
          Create Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((obj, idx) => {
          return <BlogCard key={obj.id} data={obj}></BlogCard>;
        })}
      </div>
    </div>
  );
};

export default DashboardRoute;
