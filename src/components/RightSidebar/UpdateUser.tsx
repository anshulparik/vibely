"use client";

import Image from "next/image";
import { User } from "@prisma/client";
import { IoClose } from "react-icons/io5";
import { CldUploadWidget } from "next-cloudinary";
import React, { useActionState, useState } from "react";
import { updateUserProfile } from "@/actions";
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [modalToggle, setModalToggle] = useState(false);
  const [coverInfo, setcoverInfo] = useState<any>({});
  const [avatarInfo, setAvatarInfo] = useState<any>({});
  const [state, formAction] = useActionState(updateUserProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setModalToggle(false);
    state.success && router.refresh();
  };

  return (
    <div>
      <span
        className="text-sky-500 text-sm cursor-pointer"
        onClick={() => setModalToggle(true)}
      >
        Update
      </span>
      {modalToggle && (
        <div
          className="absolute 
        top-0 left-0 right-0 bottom-0 bg-black bg-opacity-65 
        flex items-center justify-center z-50"
        >
          <form
            action={(formData) =>
              formAction({
                formData,
                coverURL: coverInfo?.secure_url || "",
                avatarURL: avatarInfo?.secure_url || "",
              })
            }
            className="p-8 bg-white rounded-lg shadow-md
            flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            {/* Title */}

            <h1 className="text-sky-500 text-lg font-semibold">
              Update Profile
            </h1>

            {/* Cover Pic */}
            <div className="flex items-center justify-between mb-4">
              <CldUploadWidget
                uploadPreset="vibely"
                onSuccess={(result) => {
                  setAvatarInfo(result?.info)}}
              >
                {({ open }) => {
                  return (
                    <div
                      className="flex flex-col gap-4 my-4"
                      onClick={() => open()}
                    >
                      <label htmlFor="" className="text-gray-600">
                        Avatar
                      </label>
                      <div className="flex items-center gap-4 cursor-pointer">
                        <div className="h-8 w-12 relative">
                          <Image
                            src={user?.avatarURL || "/noAvatar.jpg"}
                            alt=""
                            className="absolute object-cover rounded-md"
                            fill
                          />
                        </div>
                        <span className="text-xs underline text-sky-500 font-semibold">
                          Change
                        </span>
                      </div>
                    </div>
                  );
                }}
              </CldUploadWidget>
              <CldUploadWidget
                uploadPreset="vibely"
                onSuccess={(result) => setcoverInfo(result?.info)}
              >
                {({ open }) => {
                  return (
                    <div
                      className="flex flex-col gap-4 my-4"
                      onClick={() => open()}
                    >
                      <label htmlFor="" className="text-gray-600">
                        Cover Picture
                      </label>
                      <div className="flex items-center gap-4 cursor-pointer">
                        <div className="h-8 w-12 relative">
                          <Image
                            src={user?.coverURL || "/noCover.jpg"}
                            alt=""
                            className="absolute object-cover rounded-md"
                            fill
                          />
                        </div>
                        <span className="text-xs underline text-sky-500 font-semibold">
                          Change
                        </span>
                      </div>
                    </div>
                  );
                }}
              </CldUploadWidget>
            </div>

            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                  placeholder={user?.username || "johndoe"}
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                  placeholder={user?.firstName || "John"}
                />
              </div>

              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                  placeholder={user?.lastName || "Doe"}
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-gray-600">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                  placeholder={user?.description || "Live is beautiful..."}
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                  placeholder={user?.location || "Pune, India"}
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-gray-600">
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                  placeholder={user?.school || "BVP, Pune"}
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-gray-600">
                  Work
                </label>
                <input
                  type="text"
                  name="work"
                  className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                  placeholder={user?.work || "Apple Inc."}
                />
              </div>
              {/* Input */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-gray-600">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  className="outline-none border-b-2 text-gray-400 
                  focus:text-gray-600 focus:border-gray-600"
                  placeholder={user?.website || "Portfolio Link"}
                />
              </div>
            </div>
            <UpdateButton />
            {state.success && (
              <span className="text-center text-xs text-green-500">
                Profile has been updated successfully!
              </span>
            )}
            {state.error && (
              <span className="text-center text-xs text-red-500">
                Something went wrong!
              </span>
            )}
            <div
              className="text-2xl cursor-pointer 
              absolute right-2 top-3"
            >
              <IoClose className="text-sky-500" onClick={handleClose} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
