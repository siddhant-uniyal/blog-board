import BlogCard from "@/components/general/BlogCard";
import { BlogCardSkeleton } from "@/components/general/BlogCardSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React, { Suspense } from "react";

const getData = async () => {
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

const BlogCardData = async () => {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => {
        return <BlogCard key={item.id} data={item}></BlogCard>;
      })}
    </div>
  );
};

const DashboardRoute = async () => {
  const { getUser } = getKindeServerSession();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link href="/dashboard/create" className={buttonVariants()}>
          Create Post
        </Link>
      </div>

        <Suspense fallback={<BlogCardSkeleton></BlogCardSkeleton>}>
          <BlogCardData></BlogCardData>
        </Suspense>
    </div>
  );
};

export default DashboardRoute;
