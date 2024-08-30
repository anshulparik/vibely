"use client";

import { switchLike } from "@/actions";
import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

const PostInteraction = ({
  postId,
  likes,
  commentsCount,
}: {
  postId: number;
  likes: string[];
  commentsCount: number;
}) => {
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes?.length,
    isLiked: userId ? likes?.includes(userId) : false,
  });

  const triggerLikeAction = async () => {
    try {
      await switchLike(postId);
      setLikeState((prev: { isLiked: boolean; likeCount: number }) => {
        return {
          likeCount: prev?.isLiked ? prev?.likeCount - 1 : prev?.likeCount + 1,
          isLiked: !prev?.isLiked,
        };
      });
    } catch (error) {
      console.log(error, "triggerLikeAction err!");
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex gap-6 md:gap-8">
        <div className="flex items-center gap-2 md:gap-4">
          <form action={triggerLikeAction}>
            <button>
              <AiFillLike
                className={`md:text-2xl cursor-pointer  ${
                  likeState?.isLiked ? "text-sky-500" : "text-gray-600"
                }`}
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 text-xs 2xl:text-sm">
            {likeState?.likeCount}
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <FaCommentAlt className="md:text-xl cursor-pointer text-gray-600" />
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 text-xs 2xl:text-sm">
            {commentsCount}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <FaShare className="md:text-xl cursor-pointer text-gray-600" />
      </div>
    </div>
  );
};

export default PostInteraction;
