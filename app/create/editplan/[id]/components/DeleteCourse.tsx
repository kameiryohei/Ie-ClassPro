"use client";
import Modal from "@/app/components/layout/Modal/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
interface DeleteCourseProps {
  planId: number;
}

const DeleteCourse: React.FC<DeleteCourseProps> = ({ planId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/plan/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      toast.success("投稿を削除しました");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("投稿の削除に失敗しました");
      console.error(error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const modalOpen = () => {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h1 className="text-center text-base md:text-xl">
            この投稿を本当に削除しますか？
          </h1>
          <div className="flex justify-center mt-6 gap-10">
            <button
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 duration-200"
              onClick={() => setIsOpen(false)}
            >
              いいえ
            </button>
            <button
              className="p-3 bg-red-500 text-white rounded-md hover:bg-red-400 duration-200"
              onClick={handleDelete}
            >
              はい
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <FaTrashAlt
        size={20}
        className=" hover:size-6 duration-200"
        onClick={() => setIsOpen(true)}
      />
      {modalOpen()}
    </div>
  );
};

export default DeleteCourse;
