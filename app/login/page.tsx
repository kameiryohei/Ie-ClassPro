import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AuthForm from "./components/AuthForm";

export default function LoginPage() {
  return (
    <div className="mt-40 flex justify-center">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">アカウント関連</CardTitle>
          <CardDescription>ログインまたは新規登録してください</CardDescription>
        </CardHeader>
        <AuthForm />
      </Card>
    </div>
  );
}
