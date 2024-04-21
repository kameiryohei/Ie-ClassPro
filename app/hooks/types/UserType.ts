export type UserType = {
  id: number;
  auth_id: string;
  email: string;
  name: string;
  university: string; // 大学名
  faculty: string; // 学部名
  department: string; // 学科名
  grade: number; // 学年

  posts: [];
};
