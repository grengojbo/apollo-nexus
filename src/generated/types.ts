export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string | null;
  password: string;
  language: string;
  enabled: boolean;
  posts: Post[];
  group: Group | null;
  groupId: number | null;
  comments: Comment[];
}

export interface Post {
  id: number;
  published: boolean;
  title: string;
  author: User | null;
  authorId: number | null;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: number;
  contain: string;
  post: Post;
  postId: number;
  author: User | null;
  authorId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
}