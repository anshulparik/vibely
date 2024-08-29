import React from "react";
import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="text-sm text-white font-semibold bg-sky-500 
        mt-4 p-2 rounded-md disabled:bg-opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
