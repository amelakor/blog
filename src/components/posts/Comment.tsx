import { useMessage } from "@/context/MessageContext";
import { CommentType } from "@/types/post";

type CommentProps = {
    comment: CommentType;
    index: number;
};

export const Comment = ({ comment, index }: CommentProps) => {
    useMessage("Comments");

    const { body, email } = comment;
    return (
        <div>
            <p>
                {index + 1}. {body}
            </p>
            <a href={`mailto:${email}`}>By: {email}</a>
        </div>
    );
};
