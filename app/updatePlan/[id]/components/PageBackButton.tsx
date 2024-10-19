"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";

const PageBackButton = () => {
  const router = useRouter();

  return (
    <IoArrowBackSharp
      size={36}
      className="absolute top-7 hover:ring-2 hover:ring-orange-500 rounded-full duration-200"
      onClick={() => {
        router.back();
        router.refresh();
      }}
    />
  );
};

export default PageBackButton;
