import { render, waitFor, screen, act } from "@testing-library/react";
import { config } from "lib/config";
import UpdatePage from "app/updatePlan/[id]/page";
import { mockData } from "./mock/mock_UpdatePage";

jest.mock("next/headers", () => ({
  headers: jest.fn(() => ({
    get: jest.fn(() => "test-host"),
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn(); //fetch関数をモック化

describe("UpdatePageコンポーネントに関するテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("APIから正しくデータを取得する", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(await UpdatePage({ params: { id: 1 } }));
    await act(async () => {});

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${config.apiPrefix}test-host/api/plan/update/1`, //仮としてidが1のデータを取得する
        expect.objectContaining({
          cache: "no-store",
          method: "GET",
          headers: {
            "x-api-key": expect.any(String),
          },
        })
      );
    });
  });

  test("UpdatePageCoreに正しいpropsを渡し、それが画面に表示されていることを確認する", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(await UpdatePage({ params: { id: 1 } }));

    await act(async () => {});

    expect(screen.getByDisplayValue("テストタイトル")).toBeInTheDocument();
    expect(screen.getByDisplayValue("テスト内容")).toBeInTheDocument();
    expect(screen.getByDisplayValue("講座1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("講座2")).toBeInTheDocument();
  });
});
