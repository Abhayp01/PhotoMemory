import React, { useState, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { imageAPI } from "../api";
import MasonryGrid from "../components/image/MasonryGrid";
import SearchBar from "../components/shared/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { ImageSkeleton } from "../components/ui/Skeleton";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 400);

  const isSearching = debouncedQuery.trim().length > 0;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: isSearching ? ["search", debouncedQuery] : ["explore"],
    queryFn: async ({ pageParam }) => {
      const params = { cursor: pageParam, limit: 20 };
      const res = isSearching
        ? await imageAPI.search({ q: debouncedQuery, ...params })
        : await imageAPI.explore(params);
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

  // Popular tags for quick filtering
  const popularTags = ["nature", "travel", "food", "portrait", "architecture", "street", "art"];

  return (
    <div>
      {/* Header + Search */}
      <div className="mb-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Explore
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Discover amazing photos from the community
          </p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, tags..."
        />

        {/* Quick tag filters */}
        {!isSearching && (
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-violet-500/50 hover:text-violet-400 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
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
    </div>
  );
}
