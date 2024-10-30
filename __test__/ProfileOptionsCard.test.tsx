import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ProfileOptionsCard from "app/profile/components/ProfileOptionsCard";
//テス語がpassするけど、エラーが出る
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../app/login/actions.ts", () => ({
  singOut: jest.fn(),
}));

describe("<ProfileOptionsCard />", () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("コンポーネントが正しくレンダリングされる", () => {
    render(<ProfileOptionsCard id="1" />);
    expect(screen.getByText("機能")).toBeInTheDocument();
    expect(screen.getByText("プロフィールを編集する")).toBeInTheDocument();
    expect(screen.getByText("自分の過去のレビューを見る")).toBeInTheDocument();
    expect(screen.getByText("過去のプランを編集・削除")).toBeInTheDocument();
    expect(screen.getByText("ログアウト")).toBeInTheDocument();
  });

  test("各ボタンとリンクが正しくレンダリングされる", () => {
    render(<ProfileOptionsCard id="1" />);
    expect(
      screen.getByLabelText("プロフィールを編集する").closest("a")
    ).toHaveAttribute("href", "/profile/edit");
    expect(
      screen.getByLabelText("自分の過去のレビューを見る").closest("a")
    ).toHaveAttribute("href", "/post");
    expect(
      screen.getByLabelText("過去のプランを編集・削除").closest("a")
    ).toHaveAttribute("href", "/create/editplan/1");
  });
});
