export interface Delivery {
  id: string;
  date: string;
  workers: string[];
  lots: number;
  totalValue: number;
  gasExpense: number;
  netProfit: number;
  carShare: number;
  workerAShare: number;
  workerBShare: number;
}

export interface ChartDataPoint {
  date: string;
  total: number;
  profit: number;
  gas: number;
  deliveries: number;
}

export type Period = 'week' | 'month';
