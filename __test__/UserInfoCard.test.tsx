import { render, screen } from "@testing-library/react";
import UserInfoCard from "app/allPost/[id]/components/UserInfoCard";
import { mockUser } from "./mock/mock_User";

describe("<UserInfoCard />", () => {
  test("作成者情報が正しく表示されるかのテスト", () => {
    render(<UserInfoCard user={mockUser} />);

    expect(screen.getByText("作成者情報")).toBeInTheDocument();
    expect(
      screen.getByText(`作成者：${mockUser.name}さん`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`学校名：${mockUser.university}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`学部名：${mockUser.faculty}`)).toBeInTheDocument();
    expect(
      screen.getByText(`学科名：${mockUser.department}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`学年：${mockUser.grade}年生`)).toBeInTheDocument();
  });
});
