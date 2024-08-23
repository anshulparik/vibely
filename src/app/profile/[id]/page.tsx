import Feed from "@/components/Feed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import React from "react";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="flex gap-6 p-3 md:p-6">
      <div className="hidden xl:block w-[20%]">
        <LeftSidebar type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="">
            <div className="relative">
              <div className="relative w-full h-64">
                <Image
                  src="/ads.jpg"
                  alt=""
                  className="absolute object-cover rounded-md"
                  fill
                />
              </div>
              <div
                className="absolute right-0 -bottom-16 z-10"
                style={{ left: "calc(50% - 64px)" }}
              >
                <div className="relative w-32 h-32">
                  <Image
                    src="/profile_img.png"
                    alt=""
                    className="absolute object-cover rounded-full 
                    ring-4 ring-gray-700"
                    fill
                  />
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h1 className="text-gray-700 text-2xl font-semibold mb-4 text-center">
                Anshul Parik
              </h1>
              <div className="flex items-center justify-center gap-12 mb-4">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-700">223</span>
                  <span className="text-sm font-semibold text-gray-700">
                    Posts
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-700">3.2k</span>
                  <span className="text-sm font-semibold text-gray-700">
                    Followers
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-700">1.3k</span>
                  <span className="text-sm font-semibold text-gray-700">
                    Following
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default ProfilePage;
