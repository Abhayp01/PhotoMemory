import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import toast from "react-hot-toast";
import signupBg from "../assets/signup.jpg";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ username, email, password });
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
          style={{ backgroundImage: `url(${signupBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/80 to-zinc-950" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-white font-bold text-2xl tracking-tighter">PM</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Create account</h1>
          <p className="text-zinc-400 text-base">Join the PhotoMemory community</p>
        </div>

        <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl">
          <form 
            onSubmit={handleSubmit} 
            className="space-y-5 p-8 rounded-[2.25rem] border border-white/5 shadow-inner"
          >
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Username</label>
              <input 
                id="signup-username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300" 
                placeholder="johndoe" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                id="signup-email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300" 
                placeholder="name@example.com" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Password</label>
              <input 
                id="signup-password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                minLength={6}
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300" 
                placeholder="Min 6 characters" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 shadow-xl shadow-violet-500/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all duration-200 uppercase tracking-widest mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-8">
          Already a member?{" "}
          <NavLink to="/login" className="text-white hover:text-violet-400 font-semibold transition-colors underline underline-offset-4 decoration-zinc-800">Sign in here</NavLink>
        </p>
      </div>
    </div>
  );
}
