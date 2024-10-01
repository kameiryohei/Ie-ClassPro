import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NotAllowPage from "app/components/NotAllowPage";

describe("NotAllowPage", () => {
  it("renders without crashing", () => {
    render(<NotAllowPage />);
  });

  it("displays the error message correctly", () => {
    render(<NotAllowPage />);
    const errorMessage =
      screen.getByText(/このページにはアクセスできません！/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
