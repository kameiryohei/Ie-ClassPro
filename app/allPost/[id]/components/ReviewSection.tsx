import CourseReview from "./CourseReview";
import ParticleReview from "./ParticleReview";
import { Post } from "../components/index";

interface ReviewSectionProps {
  id: string;
  auth_id: string;
  post: Post[];
}
const ReviewSection = ({ id, auth_id, post }: ReviewSectionProps) => {
  return (
    <>
      <p className="font-semibold text-center text-2xl">
        <span className="border-b-4 border-orange-400 inline-block">
          レビュー
        </span>
      </p>
      <div>
        <CourseReview id={id} auth_id={auth_id} />
        <ParticleReview post={post} />
      </div>
    </>
  );
};

export default ReviewSection;
