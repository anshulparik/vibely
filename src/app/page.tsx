import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed/Feed";
import LeftSidebar from "@/components/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/RightSidebar/RightSidebar";
import Stories from "@/components/Stories";

const Homepage = () => {
  return (
    <div className="flex gap-6 p-3 md:p-6">
      <div className="hidden xl:block w-[20%]">
        <LeftSidebar type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Homepage;
