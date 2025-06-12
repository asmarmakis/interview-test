
export interface Order {
  id: number;
  carId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  deliveryDate?: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  totalAmount: number;
  paymentMethod: 'cash' | 'credit_card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
}

export interface CreateOrderRequest {
  carId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryDate?: string;
  totalAmount: number;
  paymentMethod: 'cash' | 'credit_card' | 'bank_transfer';
  notes?: string;
}
