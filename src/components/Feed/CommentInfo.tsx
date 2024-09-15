"use client";

import { deleteComment, deletePost } from "@/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { SlOptions } from "react-icons/sl";

const CommentInfo = ({
  commentId,
  setCommentState,
}: {
  commentId: number;
  setCommentState: any;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const deleteCommentById = deleteComment.bind(null, commentId);

  const handleDelete = async () => {
    await deleteCommentById();
    setCommentState((prev: any) =>
      prev?.filter((item: any) => item.id !== commentId)
    );
    router?.refresh();
  };

  return (
    <div className="relative">
      <SlOptions
        className="text-xl text-gray-600 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className=" w-32 absolute top-4 right-0 bg-white p-4 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <form action={handleDelete}>
            <div className="flex items-center gap-2 cursor-pointer">
              <MdDelete className="text-red-500 text-lg" />
              <button className="text-red-500 font-semibold">Delete</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentInfo;
