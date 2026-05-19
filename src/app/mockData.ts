import { Delivery } from './types';

function make(id: number, date: string, lots: number, totalValue: number, gasExpense: number): Delivery {
  const netProfit = totalValue - gasExpense;
  return {
    id: `del-${id}`,
    date,
    workers: ['João Silva', 'Carlos Santos'],
    lots,
    totalValue,
    gasExpense,
    netProfit,
    carShare: parseFloat((netProfit * 0.4).toFixed(2)),
    workerAShare: parseFloat((netProfit * 0.3).toFixed(2)),
    workerBShare: parseFloat((netProfit * 0.3).toFixed(2)),
  };
}

export const mockDeliveries: Delivery[] = [
  make(1,  '2026-05-18', 47, 520.00, 65.00),
  make(2,  '2026-05-17', 38, 420.00, 55.00),
  make(3,  '2026-05-16', 52, 580.00, 70.00),
  make(4,  '2026-05-15', 31, 345.00, 45.00),
  make(5,  '2026-05-14', 44, 490.00, 60.00),
  make(6,  '2026-05-13', 29, 320.00, 40.00),
  make(7,  '2026-05-12', 58, 640.00, 75.00),
  make(8,  '2026-05-11', 35, 390.00, 50.00),
  make(9,  '2026-05-10', 42, 465.00, 58.00),
  make(10, '2026-05-09', 50, 555.00, 68.00),
  make(11, '2026-05-08', 27, 300.00, 38.00),
  make(12, '2026-05-07', 61, 675.00, 80.00),
  make(13, '2026-05-06', 33, 365.00, 48.00),
  make(14, '2026-05-05', 55, 610.00, 72.00),
  make(15, '2026-05-04', 40, 445.00, 55.00),
  make(16, '2026-05-03', 45, 500.00, 62.00),
  make(17, '2026-05-02', 36, 400.00, 52.00),
  make(18, '2026-05-01', 48, 535.00, 66.00),
  make(19, '2026-04-30', 30, 335.00, 42.00),
  make(20, '2026-04-29', 53, 590.00, 71.00),
  make(21, '2026-04-28', 39, 435.00, 54.00),
  make(22, '2026-04-27', 46, 512.00, 64.00),
  make(23, '2026-04-26', 28, 312.00, 39.00),
  make(24, '2026-04-25', 60, 666.00, 78.00),
  make(25, '2026-04-24', 34, 378.00, 49.00),
  make(26, '2026-04-23', 41, 455.00, 57.00),
  make(27, '2026-04-22', 49, 545.00, 67.00),
  make(28, '2026-04-21', 26, 289.00, 36.00),
  make(29, '2026-04-20', 57, 630.00, 76.00),
  make(30, '2026-04-19', 32, 355.00, 46.00),
];
