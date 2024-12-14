

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface Transaction {
  id: number;
  amount: number;
  accountId: number;
  destinationId: number | null;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}