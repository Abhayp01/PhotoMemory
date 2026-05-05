import React, { useState } from "react";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";

export default function SearchBar({ value, onChange, placeholder = "Search images, tags..." }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`relative flex items-center transition-all duration-300 ${
        focused ? "w-full max-w-lg" : "w-full max-w-md"
      }`}
    >
      <HiOutlineMagnifyingGlass
        className={`absolute left-4 w-5 h-5 transition-colors ${
          focused ? "text-violet-400" : "text-zinc-500"
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3 rounded-2xl bg-zinc-900/80 border border-white/5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 p-1 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <HiXMark className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
