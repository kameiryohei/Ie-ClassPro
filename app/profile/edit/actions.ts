"use server";

import { config } from "lib/config";
import { userInfoEditSchema } from "./validate";

type UserInfoState = {
  errors?: {
    name?: string[];
    university?: string[];
    faculty?: string[];
    department?: string[];
    grade?: string[];
  };
  message?: string | null;
};

export async function UpdateUserInfo(
  prevState: UserInfoState,
  formData: FormData
): Promise<UserInfoState> {
  const data = {
    name: formData.get("name") as string,
    university: formData.get("university") as string,
    faculty: formData.get("faculty") as string,
    department: formData.get("department") as string,
    grade: Number(formData.get("grade")),
    auth_id: formData.get("auth_id") as string,
  };
  const host = formData.get("host") as string;

  const validateResult = userInfoEditSchema.safeParse(data);
  if (!validateResult.success) {
    return {
      errors: validateResult.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${config.apiPrefix}${host}/api/user/update`, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update user info");
    }
    return { message: "ユーザー情報が正常に更新されました。" };
  } catch (error) {
    return {
      message: "ユーザー情報の更新に失敗しました。もう一度お試しください。",
    };
  }
}
