import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import toast from "react-hot-toast";
import loginBg from "../assets/login.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Welcome back! 👋");
      navigate("/feed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
      {/* Background Image Mask with refined overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.5] scale-105 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${loginBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/80 to-zinc-950" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-white font-bold text-2xl tracking-tighter">PM</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Welcome back</h1>
          <p className="text-zinc-400 text-base">Sign in to your PhotoMemory account</p>
        </div>

        <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-[2.25rem] border border-white/5 shadow-inner"
          >
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">Forgot?</button>
              </div>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 shadow-xl shadow-violet-500/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all duration-200 uppercase tracking-widest"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Checking...</span>
                </div>
              ) : "Sign in to account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-8">
          New here?{" "}
          <NavLink to="/signup" className="text-white hover:text-violet-400 font-semibold transition-colors underline underline-offset-4 decoration-zinc-800">Create an account</NavLink>
        </p>
      </div>
    </div>
  );
}
