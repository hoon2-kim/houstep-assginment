export interface IFindOrderList {
  order_date: Date;
  order_type: string;
  amount: number;
  customer_name: string;
  customer_rating: string;
}

export interface IFindMonthlyOrderStatistics {
  [key: string]: string;
}
