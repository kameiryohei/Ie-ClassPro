import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  data: {
    name: string;
    email: string;
    university: string;
    faculty: string;
    department: string;
    grade: number;
  };
}

const ProfileCard = ({ data }: ProfileCardProps) => {
  const { name, email, university, faculty, department, grade } = data;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">プロフィール</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="images/icon.png" />
            <AvatarFallback>テスト</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              所属学校
            </p>
            <p>{university}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">学部</p>
            <p>{faculty}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">学科</p>
            <p>{department}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">学年</p>
            <p>{grade}年</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
