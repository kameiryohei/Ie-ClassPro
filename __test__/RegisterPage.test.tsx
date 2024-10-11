import { act, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import RegisterPage from "app/user/register/page";

// モック化したuseRouterをインポート
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("<Page />", () => {
  test("RegisterPageコンポーネントが正しく表示されるかのテスト", async () => {
    render(<RegisterPage />);

    await act(async () => {});

    expect(screen.getByText("新規登録画面")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("メールアドレスとパスワード欄が未入力の場合、エラーメッセージが表示されるかのテスト", async () => {
    render(<RegisterPage />);

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
    render(<RegisterPage />);

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
});
