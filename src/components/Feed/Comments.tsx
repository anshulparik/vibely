import React from "react";
import prisma from "@/lib/client";
import CommentList from "./CommentList";

const Comments = async ({ postId }: { postId: number }) => {
  let comments;
  try {
    comments = await prisma?.comment?.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error, "Error fetching comments!");
  }

  return (
    <div className="w-full">
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
