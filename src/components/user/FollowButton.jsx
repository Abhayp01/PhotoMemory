import React, { useState } from "react";
import { userAPI } from "../../api";
import useAuthStore from "../../stores/useAuthStore";
import toast from "react-hot-toast";

export default function FollowButton({ userId, initialFollowing = false, onToggle }) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  // Don't show follow button for own profile
  if (user?._id === userId) return null;

  const handleToggle = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to follow users");
      return;
    }

    setLoading(true);
    try {
      if (isFollowing) {
        await userAPI.unfollow(userId);
        setIsFollowing(false);
        toast.success("Unfollowed");
      } else {
        await userAPI.follow(userId);
        setIsFollowing(true);
        toast.success("Following!");
      }
      onToggle?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
        isFollowing
          ? "bg-zinc-800 text-zinc-300 hover:bg-red-500/20 hover:text-red-400 border border-zinc-700"
          : "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/25"
      }`}
    >
      {loading ? (
        <span className="inline-flex items-center gap-1">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      ) : isFollowing ? (
        "Following"
      ) : (
        "Follow"
      )}
    </button>
  );
}
