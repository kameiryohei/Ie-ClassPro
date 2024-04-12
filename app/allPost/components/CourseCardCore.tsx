import CardList from "./CardList";

type Course = {
  id: number;
  title: string;
  content: string;
  user: {
    name: string;
    university: string;
  };
};

async function getAllCoursesDate() {
  const res = await fetch("http://localhost:3000/api/plan", {
    cache: "no-store", //ssr
  });
  const data = await res.json();
  return data.posts;
}

const CourseCardCore = async () => {
  const AllCourseDate = await getAllCoursesDate();
  return (
    <div className="mt-4 grid gap-5 grid-cols-1 lg:grid-cols-3">
      {AllCourseDate.map((course: Course) => (
        <CardList
          key={course.id}
          id={course.id}
          tittle={course.title}
          content={course.content}
          user={course.user}
        />
      ))}
    </div>
  );
};

export default CourseCardCore;
