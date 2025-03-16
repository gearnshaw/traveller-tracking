export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = BaseEntity & {
  email: string;
  displayName: string | null;
  photoURL: string | null;
};
