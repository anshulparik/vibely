"use client";
import Link from "next/link";
import React, { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-red-400 rounded-sm ${
            isOpen ? "rotate-45 origin-left ease-out duration-500" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-1 bg-red-400 rounded-sm ${
            isOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-1 bg-red-400 rounded-sm ${
            isOpen ? "-rotate-45 origin-left ease-out duration-500" : ""
          }`}
        ></div>
      </div>
      {isOpen && (
        <nav
          className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] 
            bg-white flex flex-col justify-center items-center 
            font-semibold gap-4 text-xl z-10 text-gray-600"
        >
          <Link href="/">Home</Link>
          <Link href="/">Friends</Link>
          <Link href="/">Groups</Link>
          <Link href="/">Stories</Link>
          <Link href="/">Profile</Link>
        </nav>
      )}
    </div>
  );
};

export default MobileMenu;
