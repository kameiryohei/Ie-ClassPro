import { render, screen } from "@testing-library/react";
import ProfileCard from "app/profile/components/ProfileCard";
import { mockProfile } from "./mock/mock_Profile";

describe("<ProfileCard />", () => {
  test("コンポーネントが正しくレンダリングされ、正しいユーザー情報が表示される", () => {
    render(<ProfileCard data={mockProfile} />);

    expect(screen.getByText("プロフィール")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Test University")).toBeInTheDocument();
    expect(screen.getByText("Test Faculty")).toBeInTheDocument();
    expect(screen.getByText("Test Department")).toBeInTheDocument();
    expect(screen.getByText("3年")).toBeInTheDocument();
  });
});
