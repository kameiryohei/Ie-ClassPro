import { render, screen } from "@testing-library/react";
import CardList from "app/allPost/components/CardList";
import { mock_CardList } from "./mock/mock_CardList";

jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

describe("<CardList />", () => {
  test("タイトルが正しくレンダリングされること", () => {
    render(<CardList {...mock_CardList} />);
    expect(
      screen.getByText(`タイトル：${mock_CardList.tittle}`)
    ).toBeInTheDocument();
  });

  test("ユーザー情報が正しくレンダリングされること", () => {
    render(<CardList {...mock_CardList} />);
    expect(
      screen.getByText(
        `作成者：${mock_CardList.user.name} / 大学名:${mock_CardList.user.university}`
      )
    ).toBeInTheDocument();
  });

  test("コンテンツが正しくレンダリングされること", () => {
    render(<CardList {...mock_CardList} />);
    expect(
      screen.getByText(`説明：${mock_CardList.content}`)
    ).toBeInTheDocument();
  });

  test("リンクが正しくレンダリングされること", () => {
    render(<CardList {...mock_CardList} />);
    expect(screen.getByText("詳細を見る")).toBeInTheDocument();
  });
});
