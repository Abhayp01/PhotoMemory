import React from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import heroImg from "../assets/pexels-brett.jpg";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center -mt-20">
      {/* Background Image Mask */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.25] scale-105"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Now with social features
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">Share Your</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Photo Memories</span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Upload, discover, and share stunning photography with a community of creators. Built with performance and beauty in mind.
        </p>

        <div className="flex items-center justify-center gap-4">
          {isAuthenticated ? (
            <NavLink to="/feed" className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 shadow-xl shadow-violet-500/25 transition-all">
              Go to Feed
            </NavLink>
          ) : (
            <>
              <NavLink to="/signup" className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 shadow-xl shadow-violet-500/25 transition-all">
                Get Started
              </NavLink>
              <NavLink to="/login" className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 transition-all">
                Sign In
              </NavLink>
            </>
          )}
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-16">
          {["🚀 Fast Uploads", "🔒 Private Photos", "❤️ Social Feed", "🔍 Smart Search", "📱 Responsive"].map((f) => (
            <span key={f} className="px-3 py-1.5 rounded-full text-xs text-zinc-500 bg-zinc-900 border border-zinc-800">{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
