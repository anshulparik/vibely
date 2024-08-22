import Image from "next/image";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { FaReply } from "react-icons/fa";

const Comments = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-8 h-8">
          <Image
            src="/profile.png"
            alt=""
            fill
            className="ring-1 rounded-full ring-gray-600 absolute object-cover"
          />
        </div>
        <div className="flex flex-1 gap-2">
          <input
            className="flex-1 p-1 
            text-xs placeholder:text-xs focus:text-xs 
            md:text-sm md:placeholder:text-sm md:focus:text-sm 
            focus:text-gray-600 focus:border-gray-600
            appearance-none border-0 border-b-2 
            outline-none"
            placeholder="Write a comment..."
            id=""
          />
          <BsEmojiSmile className="md:text-xl text-sky-500 cursor-pointer self-end" />
        </div>
      </div>
      {/* comments */}

      <div className="border-2 rounded-md p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/post.jpg"
                alt=""
                fill
                className="ring-1 rounded-full ring-gray-600 absolute object-cover"
              />
            </div>
            <span className="text-xs md:text-sm font-bold text-gray-600">
              John Doe
            </span>
          </div>
          <SlOptions className="md:text-xl text-gray-600 cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2">
          <p
            className="text-xs md:text-sm text-gray-600 
          border-b-2 px-2 py-4"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex amet
            quasi quod velit quae tenetur facere at, beatae labore repudiandae
            ullam culpa deserunt, aspernatur harum consequuntur quam temporibus
            dolorum quos!
          </p>
          <div className="mt-2 flex gap-6 md:gap-8">
            <div className="flex items-center gap-2 md:gap-4">
              <AiFillLike className="md:text-2xl cursor-pointer text-gray-600" />
              <span className="text-gray-300">|</span>
              <span className="text-gray-400 text-xs 2xl:text-sm">123</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <FaReply className="md:text-2xl cursor-pointer text-gray-600" />
              <span className="text-gray-300">|</span>
              <span className="text-gray-400 text-xs 2xl:text-sm">Reply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
