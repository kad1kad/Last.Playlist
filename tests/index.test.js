import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../pages/index";
import userEvent from "@testing-library/user-event";
import UserInputField from "../components/UserInputField";

// Helper functions

function getPageHeading(pageHeading) {
  return screen.getByRole("heading", { name: pageHeading });
}

function getSubHeading(subHeading) {
  return screen.getByRole("heading", {
    name: subHeading,
  });
}

function getUserName() {
  return screen.getByRole("textbox");
}

function getUserInputField() {
  return screen.getByRole("textbox", { id: "userInput" });
}

function getSignOutBtn() {
  return screen.getByRole("button", { name: /sign out/i });
}

function clickSubmitBtn() {
  return userEvent.click(screen.getByRole("button", { name: /submit/i }));
}

// Mock session

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

// Tests

describe("Login Component", () => {
  it("Show Sign out when not signed in", () => {
    render(<Home />);

    expect(getSignOutBtn()).toBeInTheDocument();
  });
});

describe("Header Component", () => {
  test("Displays correct Page Heading and Subtitle", () => {
    render(<Home />);

    expect(getPageHeading("Last.Playlist")).toBeInTheDocument();
    expect(getSubHeading("Last.fm to Spotify Playlist")).toBeInTheDocument();
  });
});

describe("UserInputField", () => {
  test("Renders UserInputField", () => {
    render(<Home />);

    expect(getUserInputField()).toBeInTheDocument();
  });

  test("Can type into UserInputField", async () => {
    render(<Home />);

    userEvent.type(getUserName(), "test");

    await waitFor(() => expect(getUserName().value).toBe("test"));
  });

  test("Error handling", async () => {
    const onSubmit = jest.fn();
    render(<UserInputField onSubmit={onSubmit} />);

    clickSubmitBtn();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    // After submit is called with no input, should throw "User not found" error

    // await waitFor(() => {
    //   expect(screen.getByText(/user not found/i).toBeInTheDocument());
    // });
  });
});
