import Modal from "@/app/components/layout/Modal/Modal";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface EditCorseListProps {
  id: number;
  name: string;
  content: string;
}
const EditCorseList: React.FC<EditCorseListProps> = ({ id, name, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);

  async function handleDelete(courseId: number) {
    try {
      const response = await fetch(`/api/course/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      toast.success(`教科名：${data.post.name}を削除しました`);

      setIsOpen(false);
    } catch (error) {
      toast.error("投稿の削除に失敗しました");

      console.error(error);
    }
  }

  async function handleUpdate(courseId: number, name: string, content: string) {
    if (!name || !content) {
      toast.error("全ての項目を入力してください");
      return;
    }
    try {
      const response = await fetch(`/api/course/delete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId, name, content }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(`教科名：${data.courses.name}の内容を変更しました`);
      setIsUpdated(true);
    } catch (error) {
      toast.error("投稿の削除に失敗しました");

      console.error(error);
    }
  }

  const modalOpen = () => {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h1 className="text-center text-base md:text-xl">
            この授業を本当に削除しますか？
          </h1>
          <div className="flex justify-center mt-6 gap-10">
            <button
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 duration-200"
              onClick={() => setIsOpen(false)}
            >
              いいえ
            </button>
            <button
              className="p-3 bg-red-500 text-white rounded-md hover:bg-red-600 duration-200"
              onClick={() => {
                handleDelete(id);
                setIsDeleting(true);
              }}
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
      <div
        className={`flex flex-col justify-center items-center gap-y-3 bg-gray-100 p-4 rounded-2xl shadow-2xl ring-2 ring-gray-400 ${
          isDeleting ? "hidden" : ""
        }`}
      >
        {modalOpen()}
        <p className="text-center">教科名</p>
        <Input
          className={`text-base font-medium md:text-xl text-center ring-2 ring-gray-300 ${
            isUpdated ? "bg-gray-200" : ""
          }`}
          type="text"
          placeholder="教科名"
          defaultValue={name}
          ref={nameRef}
          disabled={isUpdated}
        />
        <p className="text-center">教科内容</p>
        <Input
          className={`text-base font-medium md:text-xl text-center ring-2 ring-gray-300 ${
            isUpdated ? "bg-gray-200" : ""
          }`}
          type="text"
          placeholder="教科内容"
          defaultValue={content}
          ref={contentRef}
          disabled={isUpdated}
        />

        <div className="flex gap-8">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 duration-300 text-white text-center"
          >
            削除
          </button>
          <button
            className={`px-4 py-2 rounded-lg duration-300 text-white text-center ${
              isUpdated ? "bg-gray-500" : "bg-green-700 hover:bg-green-800"
            }`}
            disabled={isUpdated}
            onClick={() => {
              handleUpdate(
                id,
                nameRef.current!.value,
                contentRef.current!.value
              );
            }}
          >
            更新
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCorseList;
