import { act, render, screen } from "@testing-library/react";
import LoginPage from "app/user/login/page";
import user from "@testing-library/user-event";

// モック化したuseRouterをインポート
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<Page />", () => {
  test("LoginPageコンポーネントが正しく表示されるかのテスト", async () => {
    render(<LoginPage />);

    await act(async () => {});

    expect(screen.getByText("ログイン画面")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("メールアドレスとパスワード欄が未入力の場合、エラーメッセージが表示されるかのテスト", async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    await act(async () => {});

    expect(
      screen.getByText("メールアドレスを入力してください")
    ).toBeInTheDocument();

    expect(
      screen.getByText("パスワードを入力してください")
    ).toBeInTheDocument();
  });

  test("適切なメールアドレス,適切なパスワードを入力していない場合、エラーメッセージが表示されるテスト", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByRole("button");

    await user.type(emailInput, "test");
    await user.type(passwordInput, "pass");
    await user.click(submitButton);

    await act(async () => {});

    expect(
      screen.getByText("有効なメールアドレスを入力してください")
    ).toBeInTheDocument();

    expect(
      screen.getByText("パスワードは6文字以上にしてください")
    ).toBeInTheDocument();
  });

  test("正しいメールアドレスを入力した時、ログイン成功メッセージが表示され、ルートにリダイレクトされるかのテスト", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const submitButton = screen.getByRole("button");

    await user.type(emailInput, "adidas827068@gmail.com");
    await user.type(passwordInput, "123456");
    await user.click(submitButton);

    await act(async () => {});

    expect(screen.getByText("ログイン中・・・")).toBeInTheDocument();
  });
});
