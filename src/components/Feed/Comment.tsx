"use client";

import { switchCommentLike } from "@/actions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

const Comment = ({ comment }: { comment: any }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [likeCount, setLikeCount] = useState(comment?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && userId) {
      const likedByUser = comment?.likes?.some(
        (like: any) => +like?.userId === +userId
      );
      setIsLiked(likedByUser);
    }
  }, [status, userId, comment?.likes]);

  const triggerCommentLikeAction = async () => {
    try {
      await switchCommentLike(comment?.id);
      setIsLiked((prev) => !prev);
      setLikeCount((prev: any) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error in triggerCommentLikeAction:", error);
    }
  };

  const likeButtonClass = useMemo(
    () =>
      `md:text-2xl cursor-pointer ${
        isLiked ? "text-sky-500" : "text-gray-600"
      }`,
    [isLiked]
  );

  return (
    <div key={comment?.id} className="border-2 rounded-md p-4 mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src={comment?.user?.avatarURL || "/noAvatar.jpg"}
              alt="User avatar"
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
        <p className="text-xs md:text-sm text-gray-600 border-b-2 px-2 py-4">
          {comment?.description}
        </p>
        <div className="mt-2 flex gap-6 md:gap-8">
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={triggerCommentLikeAction}>
              <AiFillLike className={likeButtonClass} />
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 text-xs 2xl:text-sm">
              {likeCount}
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <FaReply className="md:text-2xl cursor-pointer text-gray-600" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 text-xs 2xl:text-sm">Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
