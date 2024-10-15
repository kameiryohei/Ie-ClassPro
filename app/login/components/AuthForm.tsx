"use client";
import { login, signup } from "../actions";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

const initialState = {
  errors: {},
  message: null,
  values: {},
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [state, dispatch] = useFormState(
    isLogin ? login : signup,
    initialState
  );

  return (
    <form action={dispatch}>
      <CardContent className="space-y-2">
        <h1 className="text-lg text-center underline">
          {isLogin ? "ログイン" : "新規登録"}
        </h1>

        {state.message && (
          <div
            className={`text-sm ${
              state.message.includes("登録確認")
                ? "text-green-600"
                : "text-red-600"
            }`}
            aria-live="polite"
          >
            {state.message}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="例：example@gmail.com"
            aria-describedby="email-error"
          />
          {state?.errors?.email && (
            <div
              className="text-red-600 text-sm"
              id="email-error"
              aria-live="polite"
            >
              {state.errors.email}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="6文字以上で入力"
            aria-describedby="password-error"
          />
          {state?.errors?.password && (
            <div
              className="text-red-600 text-sm"
              id="password-error"
              aria-live="polite"
            >
              {state.errors.password}
            </div>
          )}
        </div>

        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="confirm-password">パスワード（確認）</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="パスワードを再入力"
              aria-describedby="confirm-password-error"
            />
            {state?.errors?.["confirm-password"] && (
              <div
                className="text-red-600 text-sm"
                id="confirm-password-error"
                aria-live="polite"
              >
                {state.errors["confirm-password"]}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" type="submit">
          {isLogin ? "ログイン" : "新規登録"}
        </Button>
        <Button
          variant="link"
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "新規登録はこちら" : "ログインはこちら"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default AuthForm;
