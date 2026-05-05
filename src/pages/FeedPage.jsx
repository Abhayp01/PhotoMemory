import React, { useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { feedAPI, imageAPI } from "../api";
import MasonryGrid from "../components/image/MasonryGrid";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { ImageSkeleton } from "../components/ui/Skeleton";
import { NavLink } from "react-router-dom";

export default function FeedPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: async ({ pageParam }) => {
      const res = await feedAPI.getFeed({
        cursor: pageParam,
        limit: 20,
      });
      return res.data.data;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useInfiniteScroll(handleFetchNext, {
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const allImages = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Your Feed
        </h1>
        <p className="text-zinc-500 mt-1 text-sm">
          Latest from people you follow
        </p>
      </div>

      {/* Content */}
      {!isLoading && allImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
            <span className="text-4xl">👋</span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-300">Your feed is empty</h3>
          <p className="text-zinc-500 mt-2 max-w-md">
            Follow some users to see their photos here, or discover amazing content on the Explore page.
          </p>
          <NavLink
            to="/explore"
            className="mt-6 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-violet-500/25"
          >
            Explore Photos
          </NavLink>
        </div>
      ) : (
        <>
          <MasonryGrid
            images={allImages}
            isLoading={isLoading}
            onLikeToggle={refetch}
          />

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="py-8 flex justify-center">
            {isFetchingNextPage && (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 w-full">
                <ImageSkeleton count={4} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
