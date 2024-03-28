import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { Posts } from "@/views/PostsView";
import { MessageProvider } from "@/context/MessageContext";
import usePosts from "@/hooks/usePosts";

jest.mock("../../hooks/usePosts");

const mockPosts = [
    {
        id: 1,
        title: "Post 1",
        comments: [{ id: 1, text: "Comment 1" }],
        user: {
            id: 1,
            name: "Name 1",
        },
    },
    {
        id: 2,
        title: "Post 2",
        comments: [{ id: 2, text: "Comment 2" }],
        user: {
            id: 1,
            name: "Name 2",
        },
    },
];

describe("Posts component with lazy loading", () => {
    beforeAll(() => {
        const observe = jest.fn();
        const disconnect = jest.fn();
        const unobserve = jest.fn();

        window.IntersectionObserver = jest.fn().mockImplementation(() => ({
            observe,
            disconnect,
            unobserve,
        }));
    });

    it("renders and filters posts correctly", async () => {
        (usePosts as jest.Mock).mockReturnValue({
            posts: mockPosts,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter>
                <MessageProvider>
                    <Posts />
                </MessageProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Post 1")).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText(
            "Search posts by user name"
        );
        userEvent.type(searchInput, "1");

        await waitFor(() => {
            expect(screen.getByText("Post 1")).toBeInTheDocument();
            expect(screen.queryByText("Post 2")).toBeNull();
        });
    });
});
