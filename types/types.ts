export interface UserI {
    _id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    background: string;
    followers: [];
    following: [];
    saved?: savedPost[];
}

export interface NewsI {
    _id: string;
    title: string;
    text: string;
    banner: string;
    category: string;
    creator: UserI;
    likes: likePostI[];
    comments: postCommentI[];
    createdAt: Date;
}

export interface savedPost {
    postId: string;
    title: string;
    text: string;
    banner: string;
    category: string;
    creator: {
        _id: string;
        name: string;
        avatar: string;
    };
}

export interface userDataI {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    background?: string;
}
  
export interface likePostI {
    userId: string;
    createdAt: Date;
}

export interface postCommentI {
    idComment: string;
    userId: string;
    comment: string;
    username: string;
    avatar: string;
    createdAt: Date;
}