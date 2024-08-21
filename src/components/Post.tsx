import Image from "next/image";
import React from "react";
import { SlOptions } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-4 
            h-10 w-10 relative ring-1 rounded-full ring-gray-600"
          >
            <Image
              src="/profile_img.png"
              alt=""
              className="rounded-full absolute object-cover"
              fill
            />
          </div>
          <span className="text-sm font-bold text-gray-600">Anshul Parik</span>
        </div>
        <SlOptions className="text-xl text-gray-600 cursor-pointer" />
      </div>
      {/* post */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-72 md:min-h-96 relative">
          <Image
            src="/post.jpg"
            alt=""
            className="absolute object-cover rounded-md"
            fill
          />
        </div>
        <p
          className="text-xs md:text-sm text-gray-600 
          border-b-2 pb-2"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex amet quasi
          quod velit quae tenetur facere at, beatae labore repudiandae ullam
          culpa deserunt, aspernatur harum consequuntur quam temporibus dolorum
          quos!
        </p>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-6 md:gap-8">
          <div className="flex items-center gap-2 md:gap-4">
            <AiFillLike className="md:text-2xl cursor-pointer text-gray-600" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 text-xs 2xl:text-sm">123</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <FaCommentAlt className="md:text-xl cursor-pointer text-gray-600" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 text-xs 2xl:text-sm">343</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <FaShare className="md:text-xl cursor-pointer text-gray-600" />
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 text-xs 2xl:text-sm">234</span>
        </div>
      </div>

      <Comments />
    </div>
  );
};

export default Post;
