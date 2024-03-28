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

describe("Posts", () => {
    beforeEach(() => {
        (usePosts as jest.Mock).mockReturnValue({
            posts: [],
            loading: true,
            error: null,
        });
    });

    it("displays loading state", () => {
        render(
            <MessageProvider>
                <Posts />
            </MessageProvider>
        );
        expect(screen.getByText("Loading...")).toBeInTheDocument();
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

        userEvent.type(searchInput, "1");
        await waitFor(() => {
            expect(screen.getByText("Post 1")).toBeInTheDocument();
            expect(screen.queryByText("Post 2")).toBeNull();
        });

        userEvent.clear(searchInput);
        await waitFor(() => {
            expect(screen.getByText("Post 1")).toBeInTheDocument();
            expect(screen.getByText("Post 2")).toBeInTheDocument();
        });
    });
});
