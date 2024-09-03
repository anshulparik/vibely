"use client";

import { deletePost } from "@/actions";
import React, { useState } from "react";
import { SlOptions } from "react-icons/sl";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);

  const deletePostById = deletePost.bind(null, postId);

  return (
    <div className="relative">
      <SlOptions
        className="text-xl text-gray-600 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className=" w-32 absolute top-4 right-0 bg-white p-4 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <span className="text-gray-600 cursor-pointer">View</span>
          <span className="text-gray-600 cursor-pointer">Respost</span>
          <form action={deletePostById}>
            <button className="text-red-500">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
