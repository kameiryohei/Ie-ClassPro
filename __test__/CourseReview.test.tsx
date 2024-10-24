import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CourseReview from "app/allPost/[id]/components/CourseReview";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("<CourseReview />", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockRouter = {
    push: mockPush,
    refresh: mockRefresh,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component correctly", () => {
    render(<CourseReview id={"1"} auth_id="123" />);
    expect(screen.getByText("クチコミを投稿")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("ここに入力してください")
    ).toBeInTheDocument();
    expect(screen.getByText("投稿する")).toBeInTheDocument();
  });

  test("shows validation error when submitting empty form", async () => {
    render(<CourseReview id={"1"} auth_id="123" />);
    fireEvent.click(screen.getByText("投稿する"));
    await waitFor(() => {
      expect(screen.getByText("文字を入力してください")).toBeInTheDocument();
    });
  });

  test("submits the form successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<CourseReview id={"1"} auth_id="123" />);
    fireEvent.change(screen.getByPlaceholderText("ここに入力してください"), {
      target: { value: "Test Review" },
    });
    fireEvent.click(screen.getByText("投稿する"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("投稿しました");
      expect(mockPush).toHaveBeenCalledWith("/allPost");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  test("shows error toast when submission fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    render(<CourseReview id={"1"} auth_id="123" />);
    fireEvent.change(screen.getByPlaceholderText("ここに入力してください"), {
      target: { value: "Test Review" },
    });
    fireEvent.click(screen.getByText("投稿する"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("エラーが発生しました");
    });
  });

  test("shows error toast when an exception occurs", async () => {
    global.fetch = jest.fn(() => Promise.reject("API is down")) as jest.Mock;

    render(<CourseReview id={"1"} auth_id="123" />);
    fireEvent.change(screen.getByPlaceholderText("ここに入力してください"), {
      target: { value: "Test Review" },
    });
    fireEvent.click(screen.getByText("投稿する"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("投稿に失敗しました");
    });
  });
});
