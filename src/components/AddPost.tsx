"use client";

import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaUpload } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { addPost } from "@/actions";

const AddPost = () => {
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState<any>();

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
        flex flex-col gap-4 text-sm"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="relative w-8 h-8">
          <Image
            src={"/noAvatar.jpg"}
            alt=""
            fill
            className="ring-1 rounded-full ring-gray-600 absolute object-cover"
          />
        </div>
        <span className="text-sm font-medium text-gray-400">Add Post</span>
      </div>
      <form
        action={(formData) => addPost(formData, postImage?.secure_url || "")}
        className=""
      >
        <div className="flex gap-2 mb-4">
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
        </div>
        <div className="flex items-center justify-center gap-4">
          <CldUploadWidget
            uploadPreset="vibely"
            onSuccess={(result, { widget }) => {
              setPostImage(result?.info);
              widget?.close();
            }}
          >
            {({ open }) => {
              return (
                <MdFileUpload
                  onClick={() => open()}
                  className="text-sky-500 text-3xl cursor-pointer"
                />
              );
            }}
          </CldUploadWidget>
          <button
            className="text-sm text-white font-semibold bg-sky-500 
            py-1 px-2 rounded-md"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
