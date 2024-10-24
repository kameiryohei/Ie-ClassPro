import { Post } from ".";
import { ReviewType } from "../types/ReviewType";

interface ParticleReviewProps {
  post: Post[];
}

const ParticleReview = async ({ post }: ParticleReviewProps) => {
  return (
    <div className="py-5">
      <p className="text-center text-base md:text-2xl">クチコミ一覧</p>
      <div className="pt-3 grid md:grid-cols-3 gap-6">
        {post.map((review: ReviewType) => (
          <div
            key={review.id}
            className="p-4 flex flex-col bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-300"
          >
            <div className="text-center">内容：{review.title}</div>
            <div className="text-center">
              投稿日：{review.createdAt.split("T")[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticleReview;
