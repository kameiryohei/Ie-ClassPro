import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import DeleteCourse from "./DeleteCourse";
interface SpecificCourseDataProps {
  id: number;
  title: string;
  content: string;
  userId: number;
}

const SpecificCourseCore: React.FC<SpecificCourseDataProps> = ({
  id,
  title,
  content,
  userId,
}) => {
  return (
    <div className="border-2 rounded-xl border-slate-200  shadow-2xl">
      <Card className="relative">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="overflow-ellipsis overflow-hidden whitespace-nowrap">
              タイトル：{title}
            </CardTitle>
            <DeleteCourse planId={id} />
          </div>
          <CardDescription className="overflow-ellipsis overflow-hidden whitespace-nowrap"></CardDescription>
        </CardHeader>
        <CardContent className="overflow-ellipsis overflow-hidden whitespace-nowrap">
          説明：{content}
        </CardContent>
        <CardFooter>
          <Link href={`/updatePlan/${id}`}>
            <p className="p-2 text-gray-700 hover:text-orange-400 duration-200">
              編集する
            </p>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SpecificCourseCore;
