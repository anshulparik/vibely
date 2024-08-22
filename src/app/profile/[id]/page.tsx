import Feed from '@/components/Feed';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import React from 'react'

const ProfilePage = () => {
  return (
    <div className="flex gap-6 p-3 md:p-6">
      <div className="hidden xl:block w-[20%]">
        <LeftSidebar />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightSidebar />
      </div>
    </div>
  );
}

export default ProfilePage