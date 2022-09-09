import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/index";
import userEvent from "@testing-library/user-event";

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
  it("Show Sign out when not signed in", async () => {
    render(<Home />);
    const singOutBtn = screen.getByRole("button", { name: /sign out/i });

    expect(singOutBtn).toBeInTheDocument();
  });
});

describe("Header Component", () => {
  test("Displays correct Page Heading and Subtitle", () => {
    render(<Home />);
    const pageHeading = screen.getByRole("heading", { name: "Last.Playlist" });
    const subHeading = screen.getByRole("heading", {
      name: "Last.fm to Spotify Playlist",
    });

    expect(pageHeading).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
  });
});

describe("UserInputField", () => {
  test("Render UserInputField", () => {
    render(<Home />);

    const userInput = screen.getByRole("textbox", { id: "userInput" });

    expect(userInput).toBeInTheDocument();
  });

  test("Can type into UserInputField", async () => {
    render(<Home />);

    const userInput = screen.getByRole("textbox");
    userEvent.type(userInput, "test");

    await waitFor(() => expect(userInput.value).toBe("test"));
  });
});
