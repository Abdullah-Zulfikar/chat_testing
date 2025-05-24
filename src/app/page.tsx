"use client"

import { signIn } from "next-auth/react";

export default function Home() {
 

  return (
    <div className="flex">
      <button onClick={()=>signIn("google")} className="px-3 py-3 rounded-2xl border-2 ">
        Sign in 
      </button>
    </div>
  );
}
