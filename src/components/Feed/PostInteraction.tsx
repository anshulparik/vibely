"use client";

import { switchLike } from "@/actions";
import React, { useEffect, useState, useMemo } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { useSession } from "next-auth/react";

const PostInteraction = ({
  postId,
  likes = [],
  commentsCount,
}: {
  postId: number;
  likes: number[];
  commentsCount: number;
}) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [likeCount, setLikeCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && userId) {
      setIsLiked(likes.includes(+userId));
    }
  }, [status, userId, likes]);

  const triggerLikeAction = async () => {
    try {
      await switchLike(postId);
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error in triggerLikeAction:", error);
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
    <div className="mb-4 flex items-center justify-between">
      <div className="flex gap-6 md:gap-8">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={triggerLikeAction}>
            <AiFillLike className={likeButtonClass} />
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 text-xs 2xl:text-sm">{likeCount}</span>
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
