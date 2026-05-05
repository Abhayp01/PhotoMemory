import React from "react";
import { NavLink } from "react-router-dom";
export default function ErrorPage() {

  return (
    <div id="error-page" className="bg-gray-100 h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-xl mb-2">Page Not Found</p>
      <h2>
        Return Back to Login
      </h2>
      <div className='flex justify-center'>
    <NavLink
          to="/login"
          className="p-3 bg-slate-900 text-white rounded-xl mt-10">
            Login
    </NavLink>
    </div>
    </div>
  );
}
