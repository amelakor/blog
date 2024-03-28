import { Link } from "react-router-dom";
import { PostWithCommentsAndUsers, CommentType } from "@/types/post";
import { useMessage } from "@/context/MessageContext";
import { Comment } from "./Comment";
import { Card } from "../Card";
import { Divider } from "../Divider";

type PostProps = {
    post: PostWithCommentsAndUsers;
};

export const PostItem = ({ post }: PostProps) => {
    useMessage("PostItem");

    const { user, title, body, comments } = post;
    return (
        <Card>
            <div>
                <Link to={`/post/${post.id}`}>
                    <h3>{title}</h3>
                </Link>
                <p>{body}</p>
                <p
                    style={{
                        fontStyle: "italic",
                        textAlign: "right",
                    }}
                >
                    Written by: {user?.name ?? "-"}
                </p>
            </div>
            <Divider />
            <h4>Comments</h4>
            {comments.map((comment: CommentType, index: number) => {
                return (
                    <Comment key={comment.id} comment={comment} index={index} />
                );
            })}
        </Card>
    );
};
