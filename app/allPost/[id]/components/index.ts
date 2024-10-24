export interface User {
  id: number;
  auth_id: string;
  email: string;
  name: string;
  university: string;
  faculty: string;
  department: string;
  grade: number;
}

interface Course {
  id: number;
  name: string;
  content: string;
  planId: number;
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number | null;
  planId: number;
}

export interface PlanDetail {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: User;
  courses: Course[];
  post: Post[];
}
