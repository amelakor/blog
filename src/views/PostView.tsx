import { useParams } from "react-router-dom";
import usePosts from "@/hooks/usePosts";
import { PostItem } from "@/components/posts/PostItem";
import { useMessage } from "@/context/MessageContext";

export const Post = () => {
    useMessage("PostView");

    const { id } = useParams();
    const { posts, loading, error } = usePosts(Number(id));

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div
            style={{
                padding: "20px",
            }}
        >
            <PostItem post={posts[0]} />
        </div>
    );
};
