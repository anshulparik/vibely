import Link from "next/link";
import Image from "next/image";
import React from "react";
import { User } from "@prisma/client";
import prisma from "@/lib/client";

const UserMediaCard = async ({ user }: { user?: User }) => {
  let postsWithMedia;
  try {
    postsWithMedia = await prisma?.post?.findMany({
      where: {
        userId: user?.id,
        postURL: {
          not: null,
        },
      },
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log(error, "Error fetching posts with media!");
  }

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md
      flex flex-col gap-6"
    >
      <div
        className="text-sm font-medium
        flex items-center justify-between"
      >
        <span className="text-gray-400">User Media</span>
        <Link href="/" className="text-sky-500">
          See All
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {postsWithMedia && postsWithMedia?.length ? (
          postsWithMedia?.map((post) => {
            return (
              <div key={post?.id} className="relative w-1/4 h-24">
                <Image
                  src={post?.postURL!}
                  alt=""
                  className="absolute object-cover rounded-md ring-1 ring-gray-400"
                  fill
                />
              </div>
            );
          })
        ) : (
          <span className="text-center font-semibold text-gray-600">
            No media found!
          </span>
        )}
      </div>
    </div>
  );
};

export default UserMediaCard;
