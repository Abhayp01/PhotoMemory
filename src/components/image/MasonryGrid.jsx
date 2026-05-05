import React from "react";
import ImageCard from "./ImageCard";
import { ImageSkeleton } from "../ui/Skeleton";

/**
 * Masonry grid layout using CSS columns — no JS layout calculation needed.
 * Responsive: 1 col mobile, 2 col tablet, 3 col desktop, 4 col wide.
 */
export default function MasonryGrid({ images, isLoading, onLikeToggle }) {
  if (isLoading && (!images || images.length === 0)) {
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        <ImageSkeleton count={8} />
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
          <span className="text-3xl">📷</span>
        </div>
        <h3 className="text-lg font-medium text-zinc-400">No images yet</h3>
        <p className="text-sm text-zinc-600 mt-1">
          Be the first to share something amazing
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {images.map((image) => (
        <ImageCard
          key={image._id}
          image={image}
          onLikeToggle={onLikeToggle}
        />
      ))}
    </div>
  );
}
