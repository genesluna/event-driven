export type Profile = {
  id: string;
  photoURL: string | null;
  displayName: string | null;
  email: string | null;
  createdAt: string;
  bio?: string;
  website?: string;
  followerCount?: number;
  followingCount?: number;
  isFollowing: boolean;
};

export type Photo = {
  id: string;
  name: string;
  url: string;
};

export type Follow = {
  id: string;
  displayName: string;
  photoURL: string;
};
