"use client";

import { addStory } from "@/actions";
import { Story, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type StoryWithUser = Story & {
  user: User;
};

const StoryList = ({ stories }: { stories: StoryWithUser[] }) => {
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const [storyImage, setStoryImage] = useState<any>();
  const [storiesState, setStoriesState] = useState(stories);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!user) return null;

  const triggerStoryAction = async () => {
    try {
      if (!storyImage?.secure_url) return;
      const createdStory = await addStory(storyImage?.secure_url);
      setStoriesState((prev) => [...prev, createdStory]);
      setStoryImage(null);
    } catch (error) {
      console.log(error, "Error adding story!");
    }
  };



  return (
    <>
      <CldUploadWidget
        uploadPreset="vibely"
        onSuccess={(result, { widget }) => {
          setStoryImage(result?.info);
          widget?.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2">
              <div
                onClick={() => open()}
                className="cursor-pointer
                relative w-14 h-14 md:w-20 md:h-20"
              >
                <Image
                  src={storyImage?.secure_url || user?.avatarURL || "/noAvatar.jpg"}
                  alt=""
                  fill
                  className="absolute object-cover 
                    rounded-full ring-2 ring-gray-600 opacity-50"
                />
              </div>
              {storyImage ? (
                <form action={triggerStoryAction}>
                  <button className="text-xs bg-sky-500 p-1 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-semibold text-gray-600">Add a story</span>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
      {storiesState?.length
        ? storiesState?.map((story) => {
            return (
              <div
                key={story?.id}
                className="flex flex-col items-center gap-2 "
              >
                <div
                  className="cursor-pointer
                relative w-14 h-14 md:w-20 md:h-20"
                >
                  <Image
                    src={story?.user?.avatarURL || "/noAvatar.jpg"}
                    alt=""
                    fill
                    className="absolute object-cover 
                rounded-full ring-2 ring-gray-600"
                  />
                </div>
                <span className="font-semibold text-gray-600">
                  {story?.user?.firstName && story?.user?.lastName
                    ? `${story?.user?.firstName} ${story?.user?.lastName}`
                    : story?.user?.username}
                </span>
              </div>
            );
          })
        : null}
    </>
  );
};

export default StoryList;
