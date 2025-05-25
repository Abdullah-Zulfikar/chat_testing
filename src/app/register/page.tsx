"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function Register() {
  const [orgName, setOrgName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [wabaId, setWabaId] = useState("")
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null)
  const router = useRouter();
  const {data: session} = useSession()


  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;
      const res = await fetch(
        `http://localhost:8000/api/v1/auth/super-admin/email/${session.user.email}/get`, {
          method: "GET",
          headers: {"Content-Type": "application/json"}
        }
      );
      if (res.ok) {
        const data = await res.json()
        setUserId(data?.id);
      }
    };
    
    fetchData();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Send data to backend API
    const res = await fetch(`http://localhost:8000/api/v1/business/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name:orgName, phone_number:whatsappNumber, waba_id:wabaId, super_admin:userId }),
    });

    const data = await res.json()
    console.log("Backend response",data)
    console.log("Status", data?.status)

    if (res.ok) {
      
      router.push("/dashboard");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          Register Organization
        </h2>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Organization Name
          </label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            placeholder="Enter organization name"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            placeholder="e.g. +923001234567"
          />
        </div>
         <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Whatsapp Business Id
          </label>
          <input
            type="int"
            value={wabaId}
            onChange={(e) => setWabaId(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            placeholder="Enter organization number id"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}