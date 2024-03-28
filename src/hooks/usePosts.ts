import { useState, useEffect } from "react";
import {
    PostType,
    UserType,
    CommentType,
    PostWithCommentsAndUsers,
} from "../types/post";

const usePosts = (postId?: number, limit = 50) => {
    const [posts, setPosts] = useState<PostWithCommentsAndUsers[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let postsData: PostType[] = [];
                if (postId) {
                    const postData = await fetchResource<PostType>(
                        `posts/${postId}`
                    );
                    postsData = [postData];
                } else {
                    postsData = await fetchResource<PostType[]>(
                        `posts?_limit=${limit}&_page=${page}`
                    );
                }

                const [usersData, commentsData] = await Promise.all([
                    fetchResource<UserType[]>("users"),
                    fetchResource<CommentType[]>("comments"),
                ]);

                const postsWithCommentsAndUsers = postsData.map((post) => ({
                    ...post,
                    user: usersData.find((user) => user.id === post.userId),
                    comments: commentsData.filter(
                        (comment: CommentType) => comment.postId === post.id
                    ),
                }));

                setPosts((prevPosts) => {
                    if (page === 1) {
                        return [...postsWithCommentsAndUsers];
                    } else {
                        return [...prevPosts, ...postsWithCommentsAndUsers];
                    }
                });
                setHasMore(postsData.length === limit);
                setLoading(false);
            } catch (error) {
                setError((error as Error).message.toString());
                setLoading(false);
            }
        };

        fetchData();
    }, [postId, page, limit]);

    const fetchResource = async <T>(resource: string): Promise<T> => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/${resource}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch ${resource}`);
        }
        return response.json();
    };

    return { posts, loading, error, hasMore, setPage };
};

export default usePosts;
