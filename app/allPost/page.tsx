import CourseCardCore from "./components/CourseCardCore";

const CoursePage = () => {
  return (
    <div className="px-10 py-4 flex flex-col justify-center">
      <p className="font-semibold text-center text-3xl">
        <span className="border-b-4 border-orange-500 inline-block">
          みんなの履修プラン一覧
        </span>
      </p>
      <div>
        <CourseCardCore />
      </div>
    </div>
  );
};

export default CoursePage;
