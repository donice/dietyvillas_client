"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthState } from "../context/authContext";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();

  const unprotectedRoutes = ['/signin'];

  const isProtectedRoute = useMemo(() => {
    return !unprotectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
  }, [pathname]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!token && isProtectedRoute) {
      router.push("/signin");
    }
  }, [token, isProtectedRoute, router]);

  if (!isClient) {
    return null;
  }

  if (!token && isProtectedRoute) {
    return <>Redirecting..</> ;
  }

  return <>{children}</>;
};

export default AuthGuard;