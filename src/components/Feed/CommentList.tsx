"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { FaReply } from "react-icons/fa";
import { User } from "@prisma/client";
import { addComment } from "@/actions";
import Comment from "./Comment";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: any;
  postId: number;
}) => {
  // const { user } = useUser();
  const user: any = {}
  const [commentState, setCommentState] = useState(comments);
  const [description, setDescription] = useState("");

  const triggerCommentAction = async () => {
    try {
      if (!user || !description) return;
      const createdComment = await addComment(postId, description);
      setCommentState((prev) => [...prev, createdComment]);
    } catch (error) {
      console.log(error, "Failed to add comment!");
    }
  };

  return (
    <>
      {user && (
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-8 h-8">
            <Image
              src={user?.imageUrl || "/noAvatar.jpg"}
              alt=""
              fill
              className="ring-1 rounded-full ring-gray-600 absolute object-cover"
            />
          </div>
          <form action={triggerCommentAction} className="flex flex-1 gap-2">
            <input
              className="flex-1 p-1 
                text-xs placeholder:text-xs focus:text-xs 
                md:text-sm md:placeholder:text-sm md:focus:text-sm 
                focus:text-gray-600 focus:border-gray-600
                appearance-none border-0 border-b-2 
                outline-none"
              placeholder="Write a comment..."
              onChange={(e) => setDescription(e?.target?.value)}
              value={description}
            />
            <BsEmojiSmile className="md:text-xl text-sky-500 cursor-pointer self-end" />
          </form>
        </div>
      )}
      {/* comments */}
      {commentState?.map((comment: any) => {
        return (
          <Comment comment={comment} />
        );
      })}
    </>
  );
};

export default CommentList;
