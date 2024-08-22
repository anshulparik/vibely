import React, { use } from "react";
import Birthdays from "./Birthdays";
import Ad from "./Ad";
import FriendRequest from "./FriendRequest";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightSidebar = ({ userId }: { userId?: string }) => {
  return (
    <aside className="flex flex-col gap-6">
      {23 ? (
        <>
          <UserInfoCard userId={userId} />
          <UserMediaCard userId={userId} />
        </>
      ) : null}
      <FriendRequest />
      <Birthdays />
      <Ad size="md" />
    </aside>
  );
};

export default RightSidebar;
