"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "utils/supabase/sever";
import { z } from "zod";

// zodスキーマの定義
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上で入力してください。" }),
});

const signupSchema = loginSchema
  .extend({
    "confirm-password": z.string(),
  })
  .refine((data) => data.password === data["confirm-password"], {
    message: "パスワードが一致しません",
    path: ["confirm-password"],
  });

type AuthState = {
  errors?: {
    email?: string[];
    password?: string[];
    "confirm-password"?: string[];
  };
  message?: string | null;
  values?: {
    email?: string;
  };
};

// ログイン用サーバーアクション
export async function login(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = createClient();

  // フォームデータを取得
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // バリデーション
  const validateResult = loginSchema.safeParse(data);
  if (!validateResult.success) {
    return {
      errors: validateResult.error.flatten().fieldErrors,
      values: { email: data.email },
    };
  }

  // Supabaseでログイン処理
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      message:
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      values: { email: data.email },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// 新規登録用サーバーアクション
export async function signup(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = createClient();

  // フォームデータを取得
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    "confirm-password": formData.get("confirm-password") as string,
  };

  // バリデーション
  const validateResult = signupSchema.safeParse(data);
  if (!validateResult.success) {
    return {
      errors: validateResult.error.flatten().fieldErrors,
      values: { email: data.email },
    };
  }

  // Supabaseで新規登録処理
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return {
      message:
        "新規登録に失敗しました。別のメールアドレスを試すか、後でもう一度お試しください。",
      values: { email: data.email },
    };
  }

  return {
    message: "登録確認メールを送信しました。メールをご確認ください。",
    values: { email: data.email },
  };
}

// ログアウト用サーバーアクション
export async function singOut() {
  await createClient().auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
