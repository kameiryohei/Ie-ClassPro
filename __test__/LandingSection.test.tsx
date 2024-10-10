import { render, screen, act } from "@testing-library/react";
import LandingSection from "app/components/LandingSection";
import { mockData } from "./mock/mock_CmsData";

describe("<LandingSection />", () => {
  test("LandingSectionコンポーネントが正しく表示されるかのテスト", async () => {
    render(<LandingSection data={mockData} />);

    await act(async () => {});

    expect(screen.getByText(mockData.title || "")).toBeInTheDocument();
  });

  test("アプリケーション名がレンダリングされる", async () => {
    render(<LandingSection data={mockData} />);

    await act(async () => {});

    expect(
      screen.getByText(mockData.applicationName || "")
    ).toBeInTheDocument();
  });

  test("各サブタイトルとテキストがレンダリングされる", async () => {
    render(<LandingSection data={mockData} />);

    await act(async () => {});

    expect(screen.getByText(mockData.subTitle1 || "")).toBeInTheDocument();
    expect(screen.getByText(mockData.text1)).toBeInTheDocument();
    expect(screen.getByText(mockData.subTitle2 || "")).toBeInTheDocument();
    expect(screen.getByText(mockData.text2)).toBeInTheDocument();
    expect(screen.getByText(mockData.subTitle3 || "")).toBeInTheDocument();
    expect(screen.getByText(mockData.text3)).toBeInTheDocument();
  });

  test("最後のメッセージがレンダリングされる", async () => {
    await act(async () => {
      render(<LandingSection data={mockData} />);
    });
    expect(screen.getByText(mockData.lastMessage || "")).toBeInTheDocument();
  });

  test("画像が正しいsrc属性でレンダリングされる", async () => {
    render(<LandingSection data={mockData} />);

    const imageElement = screen.getByAltText("Home");
    const imageElement_img1 = screen.getByAltText("Image 1");
    const imageElement_img2 = screen.getByAltText("Image 2");
    const imageElement_img3 = screen.getByAltText("Image 3");

    await act(async () => {});

    expect(imageElement).toHaveAttribute("src");
    expect(imageElement.getAttribute("src")).toContain(
      encodeURIComponent(mockData.icon?.url ?? "")
    );

    expect(imageElement_img1).toHaveAttribute("src");
    expect(imageElement_img1.getAttribute("src")).toContain(
      mockData.img1?.url ?? ""
    );

    expect(imageElement_img2).toHaveAttribute("src");
    expect(imageElement_img2.getAttribute("src")).toContain(
      mockData.img2?.url ?? ""
    );

    expect(imageElement_img3).toHaveAttribute("src");
    expect(imageElement_img3.getAttribute("src")).toContain(
      mockData.img3?.url ?? ""
    );
  });
});
