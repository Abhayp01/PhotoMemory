import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { imageAPI } from "../api";
import { HiHeart, HiOutlineHeart, HiOutlineShare, HiArrowLeft, HiOutlineTrash } from "react-icons/hi2";
import toast from "react-hot-toast";
import useAuthStore from "../stores/useAuthStore";

export default function ImageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["image", id],
    queryFn: async () => {
      const res = await imageAPI.getById(id);
      return res.data.data.image;
    },
  });

  const handleLike = async () => {
    try {
      if (data.isLiked) await imageAPI.unlike(id);
      else await imageAPI.like(id);
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/shared/${data.shareToken}`;
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this image?")) return;
    try {
      await imageAPI.delete(id);
      toast.success("Deleted");
      navigate(-1);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!data) return <div className="py-20 text-center text-zinc-400">Image not found</div>;

  const isOwner = user?._id === (data.user?._id || data.user);

  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors">
        <HiArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 rounded-2xl overflow-hidden bg-zinc-900">
          <img src={data.url} alt={data.title} className="w-full object-contain max-h-[80vh]" />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold text-white cursor-pointer" onClick={() => navigate(`/profile/${data.user?.username}`)}>
              {data.user?.username?.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-white cursor-pointer hover:text-violet-400 transition-colors" onClick={() => navigate(`/profile/${data.user?.username}`)}>
              {data.user?.username}
            </span>
          </div>

          <h2 className="text-2xl font-bold">{data.title}</h2>
          {data.description && <p className="text-zinc-400 text-sm">{data.description}</p>}

          {data.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs bg-zinc-800 text-violet-400 border border-zinc-700">#{tag}</span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${data.isLiked ? "bg-red-500/20 text-red-400" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}>
              {data.isLiked ? <HiHeart className="w-5 h-5" /> : <HiOutlineHeart className="w-5 h-5" />}
              {data.likesCount}
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-all">
              <HiOutlineShare className="w-5 h-5" /> Share
            </button>
            {isOwner && (
              <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-red-400 hover:bg-red-500/20 transition-all ml-auto">
                <HiOutlineTrash className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="text-xs text-zinc-600 space-y-1 pt-4 border-t border-zinc-800">
            {data.width > 0 && <p>{data.width} × {data.height} • {data.format?.toUpperCase()}</p>}
            <p>{data.visibility === "public" ? "🌍 Public" : "🔒 Private"}</p>
            <p>{new Date(data.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
