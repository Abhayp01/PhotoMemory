import React from "react";

/**
 * Skeleton loader for image cards.
 * Shows a pulsing placeholder while images load.
 */
export function ImageSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden bg-zinc-900/50 animate-pulse"
          style={{
            height: `${Math.floor(Math.random() * 150 + 200)}px`,
          }}
        >
          <div className="w-full h-full bg-zinc-800/50" />
        </div>
      ))}
    </>
  );
}

/**
 * Generic text skeleton.
 */
export function TextSkeleton({ width = "w-32", height = "h-4" }) {
  return (
    <div className={`${width} ${height} rounded bg-zinc-800 animate-pulse`} />
  );
}

/**
 * Profile card skeleton.
 */
export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-zinc-800" />
        <div className="space-y-3 flex-1">
          <div className="h-6 w-40 bg-zinc-800 rounded" />
          <div className="h-4 w-60 bg-zinc-800 rounded" />
          <div className="flex gap-6">
            <div className="h-4 w-20 bg-zinc-800 rounded" />
            <div className="h-4 w-20 bg-zinc-800 rounded" />
            <div className="h-4 w-20 bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
