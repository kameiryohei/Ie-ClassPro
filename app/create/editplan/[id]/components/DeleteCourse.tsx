"use client";
import Modal from "app/components/layout/Modal/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
interface DeleteCourseProps {
  planId: number;
}

const DeleteCourse = ({ planId }: DeleteCourseProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/plan/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      if (!data) {
        toast.error("投稿の削除に失敗しました");
      }
      setIsLoading(false);
      toast.success("投稿を削除しました");
      router.back();
      router.refresh();
    } catch (error) {
      toast.error("投稿の削除に失敗しました");
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
              {isLoading ? (
                <div className="flex">
                  <p>削除中・・・</p>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                </div>
              ) : (
                "はい"
              )}
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
