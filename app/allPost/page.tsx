import CourseCardCore from "./components/CourseCardCore";

const page = () => {
  return (
    <div className="px-10 py-4 flex flex-col justify-center">
      <p className="text-3xl inline-block font-extrabold border-b-4 border-orange-500 text-center">
        みんなの投稿リスト
      </p>
      <div>
        <CourseCardCore />
      </div>
    </div>
  );
};

export default page;
