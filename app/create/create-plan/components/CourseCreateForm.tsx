import { Input } from "@/components/ui/input";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type CourseCreateFormProps = {
  planId: number | null;
};

const CourseCreateForm: React.FC<CourseCreateFormProps> = ({ planId }) => {
  const [forms, setForms] = useState([
    { key: 1, name: "", description: "" },
    { key: 2, name: "", description: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addForm = () => {
    setForms([...forms, { key: Date.now(), name: "", description: "" }]);
  };

  const removeForm = (key: number) => {
    if (forms.length === 1) {
      toast.error("最低1つの教科を入力してください");
      return;
    }

    const index = forms.findIndex((form) => form.key === key);
    if (index !== -1) {
      const newForms = [...forms];
      newForms.splice(index, 1);
      setForms(newForms);
    }
  };

  const handleSubmit = async () => {
    if (forms.some((form) => form.name === "" || form.description === "")) {
      toast.error("入力していない項目があります");
      return;
    }
    const courses = forms.map((form) => ({
      name: form.name,
      content: form.description,
    }));

    try {
      setIsLoading(true);
      const res = await fetch("/api/course", {
        method: "POST",
        body: JSON.stringify({ courses, planId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (!res.ok) {
        throw new Error("エラーが発生しました");
      }
      toast.success("教科を保存しました");
      router.push("/");
      setIsLoading(false);
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="pt-4 flex flex-col items-center gap-3">
      {forms.map((form) => (
        <div
          key={form.key}
          className="px-8 py-3 flex justify-center flex-col lg:flex-row gap-3 bg-slate-100 rounded-2xl shadow-2xl"
        >
          <div className="flex flex-col lg:w-[500px]">
            <Input
              type="text"
              placeholder="教科名を入力してください"
              className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
              value={form.name}
              onChange={(e) => {
                const updatedForms = forms.map((f) => {
                  if (f.key === form.key) {
                    return { ...f, name: e.target.value };
                  }
                  return f;
                });
                setForms(updatedForms);
              }}
            />
            <Input
              type="text"
              placeholder="教科内容を入力してください"
              className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
              value={form.description}
              onChange={(e) => {
                const updatedForms = forms.map((f) => {
                  if (f.key === form.key) {
                    return { ...f, description: e.target.value };
                  }
                  return f;
                });
                setForms(updatedForms);
              }}
            />
          </div>
          <button
            onClick={() => removeForm(form.key)}
            className="bg-red-500 hover:bg-red-400 transition-colors text-white py-2 px-4 rounded-md"
          >
            削除
          </button>
        </div>
      ))}
      <div className="flex justify-center items-center border-b-4 border-orange-500">
        <p className="">教科を追加する</p>
        <IoIosAddCircleOutline
          size={38}
          className="hover:size-12 duration-300"
          onClick={addForm}
        />
      </div>
      <div className="pt-3">
        <button
          onClick={handleSubmit}
          className={`px-4 py-3 text-sm rounded-2xl text-white w-full shadow-lg hover:bg-orange-600 ${
            isLoading ? "cursor-not-allowed bg-gray-500" : "bg-orange-500 "
          }`}
        >
          {isLoading ? (
            <>
              <div className="flex justify-center items-center">
                <p>投稿中・・・</p>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              </div>
            </>
          ) : (
            "投稿する"
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCreateForm;
