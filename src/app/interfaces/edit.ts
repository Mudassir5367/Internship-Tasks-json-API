export interface Edit {
    id?: any;
    title?: string;
    body?: string;
    // published?: boolean;
}

export interface Post {
    id: number;
    body: string,
    title: string,
    users: string,
    time: string
    likeCount: number;
  }