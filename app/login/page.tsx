import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="mt-40 flex justify-center">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">アカウント関連</CardTitle>
          <CardDescription>ログインまたは新規登録してください</CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="例：example@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="6文字以上で入力"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" formAction={login}>
              ログイン
            </Button>
            <Button className="w-full" variant="link" formAction={signup}>
              新規登録
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
