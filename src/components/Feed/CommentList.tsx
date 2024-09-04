"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { FaReply } from "react-icons/fa";
import { Comment, User } from "@prisma/client";
import { addComment } from "@/actions";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
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
      {commentState?.map((comment) => {
        return (
          <div key={comment?.id} className="border-2 rounded-md p-4 mb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <Image
                    src={comment?.user?.avatarURL || "/noAvatar.jpg"}
                    alt=""
                    fill
                    className="ring-1 rounded-full ring-gray-600 absolute object-cover"
                  />
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-600">
                  {comment?.user?.firstName && comment?.user?.lastName
                    ? `${comment?.user?.firstName} ${comment?.user?.lastName}`
                    : comment?.user?.username}
                </span>
              </div>
              <SlOptions className="md:text-xl text-gray-600 cursor-pointer" />
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="text-xs md:text-sm text-gray-600 
                border-b-2 px-2 py-4"
              >
                {comment?.description}
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
                  <span className="text-gray-400 text-xs 2xl:text-sm">
                    Reply
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommentList;
