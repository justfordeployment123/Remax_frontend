"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RentalAgentRedirect() {
  const router = useRouter();

  useEffect(() => {
    
    router.replace('/find-agent?expertise=Rentals');
  }, [router]);

  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3668] mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to agent search with rental filter...</p>
      </div>
    </div>
  );
}