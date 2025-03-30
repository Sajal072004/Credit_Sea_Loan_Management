"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage } from "@/utils/authUtils";

export default function VerifierProtectedRoute({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user) {
      router.replace("/"); // Redirect unauthorized users
    } else if(user.role !== "verifier"){
      router.replace("/dashboard/user");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  return authorized ? children : null;
}
