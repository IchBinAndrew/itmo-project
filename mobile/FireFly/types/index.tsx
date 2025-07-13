export type User = {
  id: string;
  username: string;
};

export type Task = {
  id: string;
  type: 'text' | 'image';
  content: string | string[];
  createdAt: Date;
};

export type AuthUser = {
  id: string;
  username: string;
  name: string;
  iat: number;
};
