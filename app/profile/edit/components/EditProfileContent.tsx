"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";
import { useFormState, useFormStatus } from "react-dom";
import { UpdateUserInfo } from "../actions";

interface EditProfileContentProps {
  data: {
    id: number;
    name: string;
    university: string;
    faculty: string;
    department: string;
    grade: number;
    auth_id: string;
  };
  host: string | null;
}

const initialState = {
  errors: {},
  message: null,
};

const EditProfileContent = ({ data, host }: EditProfileContentProps) => {
  const { name, university, faculty, department, grade, auth_id } = data;

  const [state, formAction] = useFormState(UpdateUserInfo, initialState);
  const { pending } = useFormStatus();

  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <div className="bg-gray-100 rounded-2xl shadow-2xl py-2">
        <Link
          href="/profile"
          className="text-gray-500 hover:text-gray-900 duration-300"
        >
          <MdChevronLeft size={60} className=" absolute" />
        </Link>
        <h1 className="text-2xl font-bold text-center inline-block border-b-orange-500 border-b-4">
          ユーザー情報変更
        </h1>
        <div className="flex justify-center">
          <form
            action={async (formData: FormData) => {
              // 追加のパラメータを付与
              formData.append("auth_id", auth_id);
              formData.append("host", host!);
              formAction(formData);
            }}
          >
            {state.message && (
              <div className="mt-3 text-sm text-red-600" role="alert">
                {state.message}
              </div>
            )}
            <div className="mt-3">
              <div>
                <p className="font-light">ユーザー名</p>
                <Input
                  type="text"
                  placeholder="名前を変更する場合は入力してください"
                  className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
                  defaultValue={name}
                  name="name"
                />
                {state.errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {state.errors.name}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3">
              <p className="font-light">学校名</p>
              <Input
                type="text"
                placeholder="大学名を変更する場合は入力してください"
                className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
                defaultValue={university}
                name="university"
              />
              {state.errors?.university && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.university}
                </p>
              )}
            </div>
            <div className="mt-3">
              <p className="font-light">学部名</p>
              <Input
                type="text"
                placeholder="学部名を変更する場合は入力してください"
                className="mt-2 text-center placeholder:text-center placeholder:text-gray-500"
                defaultValue={faculty}
                name="faculty"
              />
              {state.errors?.faculty && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.faculty}
                </p>
              )}
            </div>
            <div className="mt-3">
              <p className="font-light">学科名</p>
              <Input
                type="text"
                placeholder="学科名を変更する場合は入力してください"
                className="text-center placeholder:text-center placeholder:text-gray-500"
                defaultValue={department}
                name="department"
              />
              {state.errors?.department && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.department}
                </p>
              )}
            </div>
            <div className="mt-3">
              <p className="font-light">学年</p>
              <Input
                type="number"
                min="1"
                max="6"
                placeholder="学年を変更する場合は入力してください"
                className="text-center placeholder:text-center placeholder:text-gray-500 h-10"
                defaultValue={grade}
                name="grade"
              />
              {state.errors?.grade && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.grade}
                </p>
              )}
            </div>
            <Button type="submit" className="mt-3" disabled={pending}>
              編集完了
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileContent;
