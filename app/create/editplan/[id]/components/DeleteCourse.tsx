"use client";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
interface DeleteCourseProps {
  planId: number;
}

async function deleteCourseData(id: number) {
  const res = await fetch(`http://localhost:3000//api/plan/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

const DeleteCourse: React.FC<DeleteCourseProps> = ({ planId }) => {
  const deleteCourse = async () => {
    try {
      deleteCourseData(planId);
      toast.success("削除しました");
    } catch (error) {
      toast.error("削除に失敗しました");
    }
  };

  return (
    <div>
      <FaTrashAlt
        size={20}
        className=" hover:size-6 duration-200"
        onClick={() => {}}
      />
    </div>
  );
};

export default DeleteCourse;
