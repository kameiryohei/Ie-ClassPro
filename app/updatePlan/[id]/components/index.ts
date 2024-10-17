export type CourseType = {
  id: number;
  name: string;
  content: string;
  planId: number;
};

export type UserType = {
  id: number;
  auth_id: string;
  email: string;
  name: string;
  university: string;
  faculty: string;
  department: string;
  grade: number;
};

export type SpecificPlanType = {
  id: number;
  title: string;
  content: string;
  userId: number;
  courses: CourseType[];
  user: UserType;
};
