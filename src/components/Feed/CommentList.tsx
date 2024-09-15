"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BsEmojiSmile } from "react-icons/bs";
import { User } from "@prisma/client";
import { addComment } from "@/actions";
import Comment from "./Comment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: any;
  postId: number;
}) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [commentState, setCommentState] = useState(comments);
  const [description, setDescription] = useState("");

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const triggerCommentAction = async () => {
    try {
      if (!user || !description) return;
      const createdComment = await addComment(postId, description);
      setCommentState((prev: any) => [...prev, createdComment]);
      router.refresh();
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
              src={user?.avatarURL || "/noAvatar.jpg"}
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
          <Comment
            key={comment?.key}
            comment={comment}
            setCommentState={setCommentState}
          />
        );
      })}
    </>
  );
};

export default CommentList;
