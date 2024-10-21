import { render, screen } from "@testing-library/react";
import PlanDetails from "app/allPost/[id]/components/PlanDetails";
import { mockContent, mockTitle } from "./mock/mock_PlanDetails";

describe("<PlanDetails />", () => {
  test("正しくレンダリングできるかテスト", () => {
    render(<PlanDetails title={mockTitle} content={mockContent} />);
  });

  test("正しく履修プランタイトルが表示されているかのテスト", () => {
    render(<PlanDetails title={mockTitle} content={mockContent} />);
    expect(screen.getByText("・履修プラン名")).toBeInTheDocument();
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  test("正しく履修プラン内容が表示されているかのテスト", () => {
    render(<PlanDetails title={mockTitle} content={mockContent} />);
    expect(screen.getByText("・履修プラン内容")).toBeInTheDocument();
    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });
});
