import { BaseEntity } from "../../shared/types";

export type Trip = BaseEntity & {
  userId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isArchived: boolean;
};
