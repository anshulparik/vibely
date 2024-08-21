import Image from "next/image";
import React from "react";

const Stories = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md 
      overflow-scroll text-xs hide-scrollbar">
      <div className="flex gap-8 w-max">
        {Array(6)
          ?.fill("_")
          ?.map((_) => {
            return (
              <div className="flex flex-col items-center gap-2 ">
                <div
                  className="cursor-pointer
                    relative w-14 h-14 md:w-20 md:h-20"
                >
                  <Image
                    src="/profile_img.png"
                    alt=""
                    fill
                    className="absolute object-cover 
                      rounded-full ring-2 ring-gray-600"
                  />
                </div>
                <span className="font-semibold text-gray-600">Ricky</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Stories;
