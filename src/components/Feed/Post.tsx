import Image from "next/image";
import React from "react";
import { SlOptions } from "react-icons/sl";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type FeedPostType = PostType & {
  user: User;
} & {
  likes: [{ userId: string }];
} & { _count: { comments: number } };

const Post = ({ post }: { post: FeedPostType }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 relative">
            <Image
              src={post?.user?.avatarURL || "/noAvatar.jpg"}
              alt=""
              className="ring-1 rounded-full ring-gray-600 absolute object-cover"
              fill
            />
          </div>
          <span className="text-sm font-bold text-gray-600">
            {post?.user?.firstName && post?.user?.lastName
              ? `${post?.user?.firstName} ${post?.user?.lastName}`
              : post?.user?.username}
          </span>
        </div>
        <SlOptions className="text-xl text-gray-600 cursor-pointer" />
      </div>
      {/* post */}
      <div className="flex flex-col gap-4">
        {post?.postURL && (
          <div className="w-full min-h-72 md:min-h-96 relative">
            <Image
              src={post?.postURL}
              alt=""
              className="absolute object-cover rounded-md"
              fill
            />
          </div>
        )}
        <p
          className="text-xs md:text-sm text-gray-600 
          border-b-2 pb-2"
        >
          {post?.description}
        </p>
      </div>
      <PostInteraction
        postId={post?.id}
        likes={post?.likes?.map((item) => item?.userId)}
        commentsCount={post?._count?.comments}
      />
      <Comments postId={post?.id}/>
    </div>
  );
};

export default Post;
