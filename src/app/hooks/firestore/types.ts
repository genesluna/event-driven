import { OrderByDirection, WhereFilterOp } from 'firebase/firestore';

export type CollectionOptions = {
  queries?: QueryOptions[];
  sort?: SortOptions;
  limit?: number;
  pagination?: boolean;
  reset?: boolean;
  get?: boolean;
};

export type QueryOptions = {
  attribute: string;
  operator: WhereFilterOp;
  value: string | number | boolean | Date | unknown[];
};

type SortOptions = {
  attribute: string;
  order: OrderByDirection;
};
