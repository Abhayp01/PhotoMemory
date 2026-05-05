import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { userAPI, imageAPI } from "../api";
import MasonryGrid from "../components/image/MasonryGrid";
import FollowButton from "../components/user/FollowButton";
import { ProfileSkeleton } from "../components/ui/Skeleton";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import useAuthStore from "../stores/useAuthStore";

export default function ProfilePage() {
  const { username } = useParams();
  const { user: currentUser } = useAuthStore();
  const isOwnProfile = currentUser?.username === username;

  const { data: profileData, isLoading: profileLoading, refetch: refetchProfile } = useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await userAPI.getProfile(username);
      return res.data.data.profile;
    },
  });

  const { data: followData } = useQuery({
    queryKey: ["followStatus", profileData?._id],
    queryFn: async () => {
      const res = await userAPI.getFollowStatus(profileData._id);
      return res.data.data;
    },
    enabled: !!profileData?._id && !isOwnProfile && !!currentUser,
  });

  const { data: imagesData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: imagesLoading, refetch: refetchImages } = useInfiniteQuery({
    queryKey: ["userImages", profileData?._id],
    queryFn: async ({ pageParam }) => {
      const res = await imageAPI.getUserImages(profileData._id, { cursor: pageParam, limit: 20 });
      return res.data.data;
    },
    initialPageParam: undefined,
    getNextPageParam: (lp) => lp.hasMore ? lp.nextCursor : undefined,
    enabled: !!profileData?._id,
  });

  const handleNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useInfiniteScroll(handleNext, { enabled: hasNextPage && !isFetchingNextPage });
  const allImages = imagesData?.pages.flatMap((p) => p.data) || [];

  if (profileLoading) return <ProfileSkeleton />;
  if (!profileData) return <div className="py-20 text-center text-zinc-400">User not found</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-violet-500/20">
          {profileData.username?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
            <h1 className="text-2xl font-bold">{profileData.username}</h1>
            {!isOwnProfile && <FollowButton userId={profileData._id} initialFollowing={followData?.isFollowing} onToggle={refetchProfile} />}
          </div>
          {profileData.bio && <p className="text-zinc-400 text-sm mb-4">{profileData.bio}</p>}
          <div className="flex items-center justify-center sm:justify-start gap-6">
            {[["Photos", profileData.imageCount], ["Followers", profileData.followerCount], ["Following", profileData.followingCount]].map(([label, count]) => (
              <div key={label} className="text-center">
                <span className="text-lg font-bold">{count || 0}</span>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MasonryGrid images={allImages} isLoading={imagesLoading} onLikeToggle={refetchImages} />
      <div ref={sentinelRef} className="py-8" />
    </div>
  );
}
