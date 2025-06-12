import initSqlJs from 'sql.js';
import { Car } from '@/types/Car';
import { Order } from '@/types/Order';

let db: any = null;

export const initDatabase = async () => {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`
  });

  db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      color TEXT NOT NULL,
      price REAL NOT NULL,
      mileage INTEGER NOT NULL,
      fuelType TEXT NOT NULL,
      transmission TEXT NOT NULL,
      status TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      carId INTEGER NOT NULL,
      customerName TEXT NOT NULL,
      customerEmail TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      orderDate TEXT NOT NULL,
      deliveryDate TEXT,
      status TEXT NOT NULL,
      totalAmount REAL NOT NULL,
      paymentMethod TEXT NOT NULL,
      paymentStatus TEXT NOT NULL,
      notes TEXT,
      FOREIGN KEY(carId) REFERENCES cars(id)
    );
  `);

  return db;
};