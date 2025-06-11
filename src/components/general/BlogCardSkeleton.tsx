import { Skeleton } from "../ui/skeleton";

export const BlogCardSkeleton = async () => {
  const data = Array.from({ length: 6 });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((_, idx) => {
        return (
          <div
            className="rounded-lg border border-gray-200 bg-white shadow-md"
            key={idx}
          >
              <Skeleton className="h-48 w-full"></Skeleton>

              <div className="p-4">
                <Skeleton className="mb-2 h-6 w-3/4"></Skeleton>

                <Skeleton className="mb-4 h-6 w-full"></Skeleton>
                {/* <Skeleton className="mb-4 h-6 w-5/6"></Skeleton> */}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="size-8 rounded-full"></Skeleton>
                    <Skeleton className="h-6 w-24"></Skeleton>
                  </div>
                  <Skeleton className="h-6 w-12"></Skeleton>
                </div>
              </div>
          </div>
        );
      })}
    </div>
  );
};
