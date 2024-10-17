import { z } from "zod";

export const userInfoEditSchema = z.object({
  name: z
    .string()
    .min(1, { message: "ユーザー名は一文字以上で入力してください" }),
  university: z
    .string()
    .min(1, { message: "大学名は一文字以上で入力してください" }),
  faculty: z
    .string()
    .min(1, { message: "学部名は一文字以上で入力してください" }),
  department: z
    .string()
    .min(1, { message: "学科名は一文字以上で入力してください" }),
  grade: z
    .number()
    .int()
    .min(1, { message: "学年は1以上で入力してください" })
    .max(6, { message: "学年は6以下で入力してください" }),
});
