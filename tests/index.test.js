import { render, screen } from "@testing-library/react";
import LoginDisplay from "../components/LoginDisplay";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession };
    }),
  };
});

describe("Login Component", () => {
  it("Show Log Out when has session", async () => {
    const { container } = render(<LoginDisplay />);

    expect(container).toMatchSnapshot();
    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });
});
