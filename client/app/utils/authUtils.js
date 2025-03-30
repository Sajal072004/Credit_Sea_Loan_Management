export function getUserFromLocalStorage() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");
    
    if (!token || !role) return null;

    return { token, role };
  }
  return null;
}

