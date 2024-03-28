import { useState } from "react";
import { PostWithCommentsAndUsers } from "@/types/post";
import { PostItem } from "@/components/posts/PostItem";
import usePosts from "@/hooks/usePosts";
import { useMessage } from "@/context/MessageContext";

export const Posts = () => {
    useMessage("PostsView");
    const { posts, loading, error } = usePosts() || {
        posts: [],
        loading: true,
        error: null,
    };
    const [searchQuery, setSearchQuery] = useState("");

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const filteredPosts = posts.filter((post: PostWithCommentsAndUsers) =>
        post.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(posts);

    return (
        <div>
            <div
                style={{
                    backgroundImage: `url("/hero.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "35vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Welcome to Posts
                </h1>
                <input
                    type="text"
                    placeholder="Search posts by user name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        marginBottom: "10px",
                        padding: "5px 10px",
                        outline: "none",
                        border: "none",
                        borderRadius: "5px",
                    }}
                />
            </div>
            <div
                style={{
                    padding: "20px",
                }}
            >
                {filteredPosts.length > 0 ? (
                    filteredPosts?.map((post: PostWithCommentsAndUsers) => (
                        <PostItem key={post.id} post={post} />
                    ))
                ) : (
                    <p>No posts found...</p>
                )}
            </div>
        </div>
    );
};
