import BlogCard from "@/components/general/BlogCard";
import { BlogCardSkeleton } from "@/components/general/BlogCardSkeleton";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export const revalidate = 5; 

const getData = async () => {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      authorImage: true,
      authorName: true,
      authorId: true,
      id: true,
      createdAt: true,
      updatedAt: true,
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


export default function Home() {
  return (
    <>
      <div className="py-6">  
        <h1 className="text-3xl font-bold tracking-tight mb-8">Latest posts</h1>
        <Suspense fallback={<BlogCardSkeleton></BlogCardSkeleton>}>
          <BlogCardData></BlogCardData>
        </Suspense>
      </div>
    </>
  );
}


