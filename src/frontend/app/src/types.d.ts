export type Category = {
  id: string;
  name: string;
}

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  description: string;
  accountName?: string;
  categoryName?: string;
}