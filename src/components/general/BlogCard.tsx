import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { deleteBlog } from "@/app/actions";

type BlogType = {
  data: {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
  currentUserId?: string;
};

const BlogCard = ({ data, currentUserId }: BlogType) => {
  const isAuthor = currentUserId && data.authorId === currentUserId;
  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md
    transition-all hover:shadow-lg"
    >
      <Link href={`/post/${data.id}`} className="block w-full h-full">
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">{data.title}</h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {data.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={data.authorImage}
                  alt={data.authorName}
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {data.authorName}
              </p>
            </div>
            <time className="text-xs text-gray-500">{new Intl.DateTimeFormat("en-IN" , {
              year: "numeric",
              month: "long",
              day: "numeric"
            }).format(data.createdAt)}</time>
          </div>
          {isAuthor && (
            <div className="flex gap-2 mt-4">
              <Link href={`/dashboard/edit/${data.id}`}>
                <Button size="sm" variant="outline">Edit</Button>
              </Link>
              <form action={async () => { 'use server'; await deleteBlog(data.id); }}>
                <Button size="sm" variant="destructive" type="submit">Delete</Button>
              </form>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
