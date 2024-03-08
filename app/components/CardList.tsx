import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
const CardList = () => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>履修プラン名</CardTitle>
          <CardDescription>学部名：〇〇学部</CardDescription>
        </CardHeader>
        <CardContent>履修プランの概要を簡単に記述する</CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/plan/1">詳細を見る</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardList;
