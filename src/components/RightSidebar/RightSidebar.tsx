import React, { Suspense } from "react";
import Birthdays from "./Birthdays";
import Ad from "../Ad";
import FriendRequest from "./FriendRequest";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";

const RightSidebar = ({ user }: { user?: User }) => {
  return (
    <aside className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="Loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequest />
      <Birthdays />
      <Ad size="md" />
    </aside>
  );
};

export default RightSidebar;
