import { render, screen, act } from "@testing-library/react";
import LandingSection from "app/components/LandingSection";
import { mockData } from "./mock/mock_CmsData";

describe("<LandingSection />", () => {
  test("LandingSectionコンポーネントが正しく表示されるかのテスト", async () => {
    await act(async () => {
      render(<LandingSection data={mockData} />);
    });

    expect(screen.getByText(mockData.title || "")).toBeInTheDocument();
  });

  test("アプリケーション名がレンダリングされる", async () => {
    await act(async () => {
      render(<LandingSection data={mockData} />);
    });
    expect(
      screen.getByText(mockData.applicationName || "")
    ).toBeInTheDocument();
  });

  test("最初のサブタイトルとテキストがレンダリングされる", async () => {
    await act(async () => {
      render(<LandingSection data={mockData} />);
    });
    expect(screen.getByText(mockData.subTitle1 || "")).toBeInTheDocument();
    expect(screen.getByText(mockData.text1)).toBeInTheDocument();
  });

  test("最後のメッセージがレンダリングされる", async () => {
    await act(async () => {
      render(<LandingSection data={mockData} />);
    });
    expect(screen.getByText(mockData.lastMessage || "")).toBeInTheDocument();
  });

  test("画像が正しいsrc属性でレンダリングされる", async () => {
    await act(async () => {
      render(<LandingSection data={mockData} />);
    });

    const imageElement = screen.getByAltText("Home");

    expect(imageElement).toHaveAttribute("src");
    expect(imageElement.getAttribute("src")).toContain(
      encodeURIComponent(mockData.icon?.url ?? "")
    );
  });
});
