export type SpecificCourseType = {
  id: number;
  title: string;
  content: string;
  userId: number;
};

export type GetDetailCourseDataResponse = {
  plans: SpecificCourseType[];
  auth_id: string;
};
