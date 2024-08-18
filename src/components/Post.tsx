import Image from "next/image";
import React from "react";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <div
          className="flex items-center gap-4 
            h-10 w-10 relative"
        >
          <Image
            src="/profile.png"
            alt=""
            className="rounded-full absolute"
            fill
          />
        </div>
      </div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default Post;
