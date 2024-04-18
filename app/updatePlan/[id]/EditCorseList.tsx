import Modal from "@/app/components/layout/Modal/Modal";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface EditCorseListProps {
  id: number;
  name: string;
  content: string;
}
const EditCorseList: React.FC<EditCorseListProps> = ({ id, name, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
      toast.success("投稿を削除しました");
      router.back();
      router.refresh();
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
              className="p-3 bg-red-500 text-white rounded-md hover:bg-red-400 duration-200"
              onClick={() => handleDelete(id)}
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
      <div className="flex flex-col justify-center items-center gap-y-3 bg-gray-100 p-4 rounded-2xl shadow-2xl ring-2 ring-gray-400">
        {modalOpen()}
        <p className="text-center">教科名</p>
        <Input
          className="text-base font-medium md:text-xl text-center ring-2 ring-gray-300"
          type="text"
          placeholder="教科名"
          defaultValue={name}
        />
        <p className="text-center">教科内容</p>
        <Input
          className="text-base font-medium md:text-xl text-center ring-2 ring-gray-300"
          type="text"
          placeholder="教科内容"
          defaultValue={content}
        />
        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 duration-300 text-white text-center"
          >
            削除
          </button>
          <button className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 duration-300 text-white text-center">
            更新
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCorseList;
