"use client";

import { switchLike } from "@/actions";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { useSession } from "next-auth/react";

const PostInteraction = ({
  postId,
  likes,
  commentsCount,
}: {
  postId: number;
  likes: number[];
  commentsCount: number;
}) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const userId = user?.id;

  const [likeState, setLikeState] = useState({
    likeCount: likes?.length,
    isLiked: false,
  });

  useEffect(() => {
    if (status === "authenticated" && userId) {
      setLikeState((prev) => ({
        ...prev,
        isLiked: likes?.includes(+userId),
      }));
    }
  }, [status, userId, likes]);

  const triggerLikeAction = async () => {
    try {
      await switchLike(postId);
      setLikeState((prev) => ({
        likeCount: prev?.isLiked ? prev?.likeCount - 1 : prev?.likeCount + 1,
        isLiked: !prev?.isLiked,
      }));
    } catch (error) {
      console.log(error, "triggerLikeAction err!");
    }
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex gap-6 md:gap-8">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={triggerLikeAction}>
            <AiFillLike
              className={`md:text-2xl cursor-pointer ${
                likeState?.isLiked ? "text-sky-500" : "text-gray-600"
              }`}
            />
          </button>
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
