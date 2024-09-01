"use client";

import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { RiChatPollFill } from "react-icons/ri";
import { MdEvent } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import prisma from "@/lib/client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { addPost } from "@/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState<any>();

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
        flex flex-col gap-4 text-sm"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="relative w-8 h-8">
          <Image
            src={user?.imageUrl || "/noAvatar.jpg"}
            alt=""
            fill
            className="ring-1 rounded-full ring-gray-600 absolute object-cover"
          />
        </div>
        <span className="text-sm font-medium text-gray-400">Add Post</span>
      </div>
      <form
        action={(formData) => addPost(formData, postImage?.secure_url || "")}
        className="flex gap-2"
      >
        <input
          className="flex-1 text-sm p-1
            placeholder:text-sm
            focus:text-sm focus:text-gray-600 focus:border-gray-600
            appearance-none border-0 border-b-2 
            outline-none"
          placeholder="What's on your mind?"
          name="description"
          onChange={(e) => setDescription(e?.target?.value)}
          value={description}
        />
        <BsEmojiSmile className="text-xl text-sky-500 cursor-pointer self-end" />
      </form>

      <div className="flex items-center justify-evenly flex-wrap">
        <CldUploadWidget
          uploadPreset="vibely"
          onSuccess={(result, { widget }) => {
            setPostImage(result?.info);
            widget?.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                onClick={() => open()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaImage className="text-sky-500 text-sm md:text-xl" />
                <span className="text-gray-400 text-xs font-semibold">
                  Photo
                </span>
              </div>
            );
          }}
        </CldUploadWidget>
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
