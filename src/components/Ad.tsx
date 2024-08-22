import React from "react";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { FaAd } from "react-icons/fa";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-md
      flex flex-col
      ${size === "sm" || size === "md" ? "gap-2" : "gap-3"}`}
    >
      <div
        className="flex items-center justify-between 
      text-sm font-medium text-gray-400"
      >
        <span>Sponsored Ads</span>
        <SlOptions className="text-xl text-gray-400 cursor-pointer" />
      </div>
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`w-full relative ${
            size === "sm" ? "h-24" : size === "md" ? "h-32" : "h-48"
          }`}
        >
          <Image
            src="/ads.jpg"
            alt=""
            className="absolute object-cover rounded-md"
            fill
          />
        </div>
        <div className="flex items-center gap-4">
          <FaAd className="text-2xl text-gray-400 cursor-pointer" />
          <span className="text-sky-500 text-sm font-semibold">
            Sea Tourism
          </span>
        </div>
        <p
          className={`${
            size === "sm" || size === "md" ? "text-xs" : "text-sm"
          } text-gray-400`}
        >
          Discover paradise by the sea—crystal waters, sun-kissed beaches, and
          endless adventure. Book your coastal escape today!
        </p>
        <button
          className={`bg-sky-100 text-gray-700 font-semibold 
          py-1 px-2 rounded-md
          ${size === "sm" || size === "md" ? "text-xs" : "text-sm"}`}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Ad;
