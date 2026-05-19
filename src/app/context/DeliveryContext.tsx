import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Delivery } from '../types';
import { mockDeliveries } from '../mockData';

interface DeliveryContextType {
  deliveries: Delivery[];
  addDelivery: (data: Omit<Delivery, 'id' | 'netProfit' | 'carShare' | 'workerAShare' | 'workerBShare'>) => void;
  deleteDelivery: (id: string) => void;
}

const DeliveryContext = createContext<DeliveryContextType | null>(null);

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [deliveries, setDeliveries] = useState<Delivery[]>(() => {
    try {
      const saved = localStorage.getItem('dc_deliveries');
      return saved ? JSON.parse(saved) : mockDeliveries;
    } catch {
      return mockDeliveries;
    }
  });

  useEffect(() => {
    localStorage.setItem('dc_deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  const addDelivery = (data: Omit<Delivery, 'id' | 'netProfit' | 'carShare' | 'workerAShare' | 'workerBShare'>) => {
    const netProfit = data.totalValue - data.gasExpense;
    const delivery: Delivery = {
      ...data,
      id: `del-${Date.now()}`,
      netProfit,
      carShare: parseFloat((netProfit * 0.4).toFixed(2)),
      workerAShare: parseFloat((netProfit * 0.3).toFixed(2)),
      workerBShare: parseFloat((netProfit * 0.3).toFixed(2)),
    };
    setDeliveries(prev => [delivery, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
  };

  const deleteDelivery = (id: string) => {
    setDeliveries(prev => prev.filter(d => d.id !== id));
  };

  return (
    <DeliveryContext.Provider value={{ deliveries, addDelivery, deleteDelivery }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDeliveries() {
  const ctx = useContext(DeliveryContext);
  if (!ctx) throw new Error('useDeliveries must be used within DeliveryProvider');
  return ctx;
}
