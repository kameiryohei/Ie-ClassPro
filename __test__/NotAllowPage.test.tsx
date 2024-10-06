import { render, screen } from "@testing-library/react";
import NotAllowPage from "app/components/NotAllowPage";

// アクセス権限がないページの表示テスト
describe("<NotAllowPage/>", () => {
  test("アクセスできないことを示す文章が正しく表示されるかのテスト", () => {
    render(<NotAllowPage />);
    expect(
      screen.getByText("このページにはアクセスできません！")
    ).toBeInTheDocument();
  });
});
