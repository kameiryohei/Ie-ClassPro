import { z } from "zod";

// zodスキーマの定義
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上で入力してください。" }),
});

export const signupSchema = loginSchema
  .extend({
    "confirm-password": z.string(),
  })
  .refine((data) => data.password === data["confirm-password"], {
    message: "パスワードが一致しません",
    path: ["confirm-password"],
  });
