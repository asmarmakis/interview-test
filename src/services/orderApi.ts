
import { Order, CreateOrderRequest } from '@/types/Order';
import { initDatabase } from './db';

export const getAllOrders = async (): Promise<Order[]> => {
  const db = await initDatabase();
  const result = db.exec('SELECT * FROM orders');
  
  if (result.length === 0) return [];
  
  return result[0].values.map((row: any) => ({
    id: row[0],
    carId: row[1],
    customerName: row[2],
    customerEmail: row[3],
    customerPhone: row[4],
    orderDate: row[5],
    deliveryDate: row[6],
    status: row[7],
    totalAmount: row[8],
    paymentMethod: row[9],
    paymentStatus: row[10],
    notes: row[11]
  }));
};

export const getOrderById = async (id: number): Promise<Order | null> => {
  const db = await initDatabase();
  const result = db.exec('SELECT * FROM orders WHERE id = ?', [id]);
  
  if (result.length === 0) return null;
  
  const row = result[0].values[0];
  return {
    id: row[0],
    carId: row[1],
    customerName: row[2],
    customerEmail: row[3],
    customerPhone: row[4],
    orderDate: row[5],
    deliveryDate: row[6],
    status: row[7],
    totalAmount: row[8],
    paymentMethod: row[9],
    paymentStatus: row[10],
    notes: row[11]
  };
};

export const createOrder = async (order: CreateOrderRequest): Promise<Order> => {
  const db = await initDatabase();
  const stmt = db.prepare(`
    INSERT INTO orders (
      carId, customerName, customerEmail, customerPhone,
      orderDate, deliveryDate, status, totalAmount,
      paymentMethod, paymentStatus, notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run([
    order.carId,
    order.customerName,
    order.customerEmail,
    order.customerPhone,
    order.orderDate,
    order.deliveryDate,
    order.status,
    order.totalAmount,
    order.paymentMethod,
    order.paymentStatus,
    order.notes
  ]);
  
  const result = db.exec('SELECT last_insert_rowid() as id');
  const newId = result[0].values[0][0];
  
  return {
    id: newId,
    ...order
  };
};

export const updateOrder = async (id: number, order: Partial<Order>): Promise<Order> => {
  const db = await initDatabase();
  const setClauses = Object.keys(order)
    .filter(key => key !== 'id')
    .map(key => `${key} = ?`)
    .join(', ');
  
  const values = Object.keys(order)
    .filter(key => key !== 'id')
    .map(key => order[key as keyof Order]);
  
  const stmt = db.prepare(`UPDATE orders SET ${setClauses} WHERE id = ?`);
  stmt.run([...values, id]);
  
  const updated = await getOrderById(id);
  if (!updated) throw new Error('Order not found after update');
  
  return updated;
};

export const deleteOrder = async (id: number): Promise<void> => {
  const db = await initDatabase();
  db.run('DELETE FROM orders WHERE id = ?', [id]);
};

export const getOrdersByCarId = async (carId: number): Promise<Order[]> => {
  const db = await initDatabase();
  const result = db.exec('SELECT * FROM orders WHERE carId = ?', [carId]);
  
  if (result.length === 0) return [];
  
  return result[0].values.map((row: any) => ({
    id: row[0],
    carId: row[1],
    customerName: row[2],
    customerEmail: row[3],
    customerPhone: row[4],
    orderDate: row[5],
    deliveryDate: row[6],
    status: row[7],
    totalAmount: row[8],
    paymentMethod: row[9],
    paymentStatus: row[10],
    notes: row[11]
  }));
};
