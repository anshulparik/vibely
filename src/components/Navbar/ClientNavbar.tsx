"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
  const showNavbar = !["/auth/login", "/auth/register"].includes(pathname);

  return <>{showNavbar ? <Navbar /> : null}</>;
}
