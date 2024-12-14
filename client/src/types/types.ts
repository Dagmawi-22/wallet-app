export interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  date: Date;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
