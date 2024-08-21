import React from 'react'
import FriendRequest from './FriendRequest'
import Birthdays from './Birthdays'
import Ad from './Ad'

const RightSidebar = ({ userId }: { userId?: string }) => {
  return (
    <aside className='flex flex-col gap-6'>
      <FriendRequest />
      <Birthdays />
      <Ad size='md' />
    </aside>
  )
}

export default RightSidebar