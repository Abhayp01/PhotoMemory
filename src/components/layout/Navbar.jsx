import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineGlobeAlt,
  HiOutlineArrowUpTray,
  HiOutlineUser,
  HiOutlineArrowRightOnRectangle,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import useAuthStore from "../../stores/useAuthStore";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-violet-500/20 text-violet-400 shadow-lg shadow-violet-500/10"
        : "text-zinc-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent hidden sm:block">
              PhotoMemory
            </span>
          </NavLink>

          {/* Nav Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/feed" className={linkClass}>
                <HiOutlineHome className="w-4 h-4" />
                Feed
              </NavLink>
              <NavLink to="/explore" className={linkClass}>
                <HiOutlineGlobeAlt className="w-4 h-4" />
                Explore
              </NavLink>
              <NavLink to="/upload" className={linkClass}>
                <HiOutlineArrowUpTray className="w-4 h-4" />
                Upload
              </NavLink>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <NavLink
                  to={`/profile/${user?.username}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] font-bold text-white">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user?.username}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Logout"
                >
                  <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-colors shadow-lg shadow-violet-500/25"
                >
                  Sign up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      {isAuthenticated && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-zinc-950/90 backdrop-blur-xl">
          <div className="flex items-center justify-around py-2">
            <NavLink to="/feed" className={({ isActive }) => `p-3 rounded-xl transition-colors ${isActive ? "text-violet-400" : "text-zinc-500"}`}>
              <HiOutlineHome className="w-6 h-6" />
            </NavLink>
            <NavLink to="/explore" className={({ isActive }) => `p-3 rounded-xl transition-colors ${isActive ? "text-violet-400" : "text-zinc-500"}`}>
              <HiOutlineMagnifyingGlass className="w-6 h-6" />
            </NavLink>
            <NavLink to="/upload" className={({ isActive }) => `p-3 rounded-xl transition-colors ${isActive ? "text-violet-400" : "text-zinc-500"}`}>
              <HiOutlineArrowUpTray className="w-6 h-6" />
            </NavLink>
            <NavLink to={`/profile/${user?.username}`} className={({ isActive }) => `p-3 rounded-xl transition-colors ${isActive ? "text-violet-400" : "text-zinc-500"}`}>
              <HiOutlineUser className="w-6 h-6" />
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
