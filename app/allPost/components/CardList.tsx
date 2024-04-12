import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CardListProps {
  id: number;
  tittle: string;
  content: string;
  user: {
    name: string;
    university: string;
  };
}

const CardList: React.FC<CardListProps> = ({ id, tittle, content, user }) => {
  const { name, university } = user;
  return (
    <div className="border-2 rounded-xl border-slate-200  shadow-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="overflow-ellipsis overflow-hidden whitespace-nowrap">
            タイトル：{tittle}
          </CardTitle>
          <CardDescription className="overflow-ellipsis overflow-hidden whitespace-nowrap">
            作成者：{name} / 大学名:{university}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-ellipsis overflow-hidden whitespace-nowrap">
          説明：{content}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/allPost/${id}`}>
            <p className="text-gray-700 hover:text-orange-400 duration-200">
              詳細を見る
            </p>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardList;
