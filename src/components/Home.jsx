import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import './comp.css'
function Home() {
  return (
    <div className="homepage relative h-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 ">Share Your Moments</h1>
        <p className="text-2xl md:text-3xl mb-8">Easily upload, store, and share your images with the world.</p>
        <br />
        <div>
          <NavLink to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mr-4">Get Started</NavLink>
          <NavLink to="/login" className="bg-slate-900 hover:bg-gray-950 text-white font-bold py-3 px-6 rounded-full">Login</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home