export type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export type UserType = {
    id: number;
    name: string;
};

export type CommentType = {
    id: number;
    postId: number;
    name: string;
    body: string;
    email: string;
};

export type PostWithCommentsAndUsers = PostType & {
    user?: UserType;
    comments: CommentType[];
};
