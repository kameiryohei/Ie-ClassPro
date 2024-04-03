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
  tittle: string;
  content: string;
  userId: number;
}

const CardList: React.FC<CardListProps> = ({ tittle, content, userId }) => {
  return (
    <div className="border-2 rounded-xl border-slate-200  shadow-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{tittle}</CardTitle>
          <CardDescription>学部名:{userId}</CardDescription>
        </CardHeader>
        <CardContent className="overflow-ellipsis overflow-hidden whitespace-nowrap">
          {content}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/plan/1">詳細を見る</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardList;
