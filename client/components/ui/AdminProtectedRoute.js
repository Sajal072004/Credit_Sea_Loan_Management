"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage } from "@/utils/authUtils";

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user) {
      router.replace("/");
    } else if ( user.role !== "admin" || user.role !== "super_admin") {
      router.replace("/dashboard/user");}
     else {
      setAuthorized(true);
    }
  }, [router]);

  return authorized ? children : null;
}
