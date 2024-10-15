import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit3, LogOut, Star, Trash2 } from "lucide-react";

const ProfileOptionsCard = ({ id }: { id: number }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">機能</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          asChild
          className="w-full justify-start hover:bg-blue-100"
          variant="ghost"
        >
          <Link href="/profile/edit">
            <Edit3 className="mr-2 h-4 w-4" />
            プロフィールを編集する
          </Link>
        </Button>
        <Button
          asChild
          className="w-full justify-start hover:bg-blue-100"
          variant="ghost"
        >
          <Link href="/post">
            <Star className="mr-2 h-4 w-4" />
            自分の過去のレビューを見る
          </Link>
        </Button>
        <Button
          asChild
          className="w-full justify-start hover:bg-blue-100"
          variant="ghost"
        >
          <Link href={`/create/editplan/${id}`}>
            <Trash2 className="mr-2 h-4 w-4" />
            過去のプランを編集・削除
          </Link>
        </Button>
        <Button
          asChild
          className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100"
          variant="ghost"
        >
          <Link href="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            ログアウト
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileOptionsCard;
