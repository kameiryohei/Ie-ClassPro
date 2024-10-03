import { UserType } from "app/hooks/types/UserType";

interface UserInfoCardProps {
  user: UserType;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  return (
    <div className="mx-auto inline-block px-6 py-4 my-4 bg-gray-100 rounded-xl shadow-2xl ring-2 ring-gray-300">
      <p className="text-lg font-light text-center border-b-2 border-gray-400">
        作成者情報
      </p>
      <div className="flex flex-col gap-y-1">
        <p className="text-base md:text-xl text-center">
          作成者：{user.name}さん
        </p>
        <p className="text-base md:text-xl text-center">
          学校名：{user.university}
        </p>
        <p className="text-base md:text-xl text-center">
          学部名：{user.faculty}
        </p>
        <p className="text-base md:text-xl text-center">
          学科名：{user.department}
        </p>
        <p className="text-base md:text-xl text-center">
          学年：{user.grade}年生
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;
