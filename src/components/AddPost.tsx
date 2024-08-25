import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { RiChatPollFill } from "react-icons/ri";
import { MdEvent } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const AddPost = () => {
  const { userId } = auth();
  if (!userId) return;


  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
        flex flex-col gap-4 text-sm"
    >
      <form action="" className="flex gap-2">
        <input
          className="flex-1 text-sm p-1
            placeholder:text-sm
            focus:text-sm focus:text-gray-600 focus:border-gray-600
            appearance-none border-0 border-b-2 
            outline-none"
          placeholder="What's on your mind?"
          name="description"
        />
        <BsEmojiSmile className="text-xl text-sky-500 cursor-pointer self-end" />
        <button>Send</button>
      </form>

      <div className="flex items-center justify-evenly flex-wrap">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaImage className="text-sky-500 text-sm md:text-xl" />
          <span className="text-gray-400 text-xs font-semibold">Photo</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaVideo className="text-sky-500 text-sm md:text-xl" />
          <span className="text-gray-400 text-xs font-semibold">Video</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <RiChatPollFill className="text-sky-500 text-sm md:text-xl" />
          <span className="text-gray-400 text-xs font-semibold">Poll</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <MdEvent className="text-sky-500 text-sm md:text-xl" />
          <span className="text-gray-400 text-xs font-semibold">Event</span>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
