import CourseReview from "./CourseReview";
import ParticleReview from "./ParticleReview";

interface ReviewSectionProps {
  id: number;
  auth_id: string;
}
const ReviewSection = ({ id, auth_id }: ReviewSectionProps) => {
  return (
    <>
      <p className="font-semibold text-center text-2xl">
        <span className="border-b-4 border-orange-400 inline-block">
          レビュー
        </span>
      </p>
      <div>
        <CourseReview id={id} auth_id={auth_id} />
        <ParticleReview id={id} />
      </div>
    </>
  );
};

export default ReviewSection;
