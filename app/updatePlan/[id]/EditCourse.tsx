import React from "react";
interface EditCourseProps {
  id: number;
  name: string;
  content: string;
}

const EditCourse: React.FC<EditCourseProps> = ({ id, name, content }) => {
  return (
    <div>
      <div className="text3xl">{id}</div>
      <div className="text3xl">{name}</div>
      <div className="text3xl">{content}</div>
    </div>
  );
};

export default EditCourse;
