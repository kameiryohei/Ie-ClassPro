"use client";

import { Input } from "@/components/ui/input";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const CourseCreateForm = () => {
  const [forms, setForms] = useState([{ key: 1 }, { key: 2 }]);

  const addForm = () => {
    setForms([...forms, { key: Date.now() }]);
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

  return (
    <div className="flex flex-col items-center gap-3">
      {forms.map((form) => (
        <div
          key={form.key}
          className="px-8 py-3 flex justify-center gap-3 bg-slate-100 rounded-2xl shadow-2xl"
        >
          <div className="flex flex-col w-[500px]">
            <Input
              type="text"
              placeholder="教科名を入力してください"
              className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
            />
            <Input
              type="text"
              placeholder="教科内容を入力してください"
              className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
            />
          </div>
          <button
            onClick={() => removeForm(form.key)}
            className="mt-4 bg-red-500 hover:bg-red-400 transition-colors text-white py-2 px-4 rounded-md"
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
        <Button>保存</Button>
      </div>
    </div>
  );
};

export default CourseCreateForm;
