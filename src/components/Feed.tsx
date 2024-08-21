import React from "react";
import Post from "./Post";

const Feed = () => {
  return (
    <>
      {Array(3)
        ?.fill("_")
        ?.map((_i) => {
          return (
            <div
              className="p-4 bg-white rounded-lg shadow-md
                flex flex-col gap-12"
            >
              <Post />
            </div>
          );
        })}
    </>
  );
};

export default Feed;
