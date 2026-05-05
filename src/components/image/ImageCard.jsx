import React, { useState, useRef, useCallback } from "react";
import { HiHeart, HiOutlineHeart, HiOutlineShare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { imageAPI } from "../../api";
import toast from "react-hot-toast";
import useAuthStore from "../../stores/useAuthStore";

export default function ImageCard({ image, onLikeToggle }) {
  const [isLiked, setIsLiked] = useState(image.isLiked || false);
  const [likesCount, setLikesCount] = useState(image.likesCount || 0);
  const [loaded, setLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login to like images");
      return;
    }

    try {
      if (isLiked) {
        const res = await imageAPI.unlike(image._id);
        setIsLiked(false);
        setLikesCount(res.data.data.likesCount);
      } else {
        const res = await imageAPI.like(image._id);
        setIsLiked(true);
        setLikesCount(res.data.data.likesCount);
      }
      onLikeToggle?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update like");
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/shared/${image.shareToken}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-zinc-900/50 cursor-pointer break-inside-avoid mb-4 transition-transform duration-300 hover:scale-[1.02]"
      onClick={() => navigate(`/image/${image._id}`)}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {/* Image */}
      {!loaded && (
        <div
          className="w-full bg-zinc-800 animate-pulse"
          style={{ aspectRatio: `${image.width || 4}/${image.height || 3}` }}
        />
      )}
      <img
        src={image.thumbnailUrl || image.url}
        alt={image.title || "Image"}
        className={`w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isLiked
                ? "bg-red-500/30 text-red-400"
                : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            {isLiked ? (
              <HiHeart className="w-5 h-5" />
            ) : (
              <HiOutlineHeart className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all"
          >
            <HiOutlineShare className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                {image.user?.username?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-white/90 font-medium truncate">
                {image.user?.username}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/70 text-xs">
              <span className="flex items-center gap-1">
                <HiHeart className="w-3.5 h-3.5" /> {likesCount}
              </span>
            </div>
          </div>
          {image.title && image.title !== "Untitled" && (
            <p className="text-sm text-white/80 mt-1 truncate">{image.title}</p>
          )}
        </div>
      </div>
    </div>
  );
}
