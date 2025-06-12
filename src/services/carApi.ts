
import { Car } from '@/types/Car';

const API_URL = 'https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars';

export const getAllCars = async (): Promise<Car[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
};

export const getCarById = async (id: number): Promise<Car | null> => {
  const db = await initDatabase();
  const result = db.exec('SELECT * FROM cars WHERE id = ?', [id]);
  
  if (result.length === 0) return null;
  
  const row = result[0].values[0];
  return {
    id: row[0],
    make: row[1],
    model: row[2],
    year: row[3],
    color: row[4],
    price: row[5],
    mileage: row[6],
    fuelType: row[7],
    transmission: row[8],
    status: row[9],
    description: row[10]
  };
};

export const createCar = async (car: CreateCarRequest): Promise<Car> => {
  const db = await initDatabase();
  const stmt = db.prepare(`
    INSERT INTO cars (make, model, year, color, price, mileage, fuelType, transmission, status, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run([
    car.make,
    car.model,
    car.year,
    car.color,
    car.price,
    car.mileage,
    car.fuelType,
    car.transmission,
    car.status,
    car.description
  ]);
  
  const result = db.exec('SELECT last_insert_rowid() as id');
  const newId = result[0].values[0][0];
  
  return {
    id: newId,
    ...car
  };
};

export const updateCar = async (id: number, car: Partial<Car>): Promise<Car> => {
  const db = await initDatabase();
  const setClauses = Object.keys(car)
    .filter(key => key !== 'id')
    .map(key => `${key} = ?`)
    .join(', ');
  
  const values = Object.keys(car)
    .filter(key => key !== 'id')
    .map(key => car[key as keyof Car]);
  
  const stmt = db.prepare(`UPDATE cars SET ${setClauses} WHERE id = ?`);
  stmt.run([...values, id]);
  
  const updated = await getCarById(id);
  if (!updated) throw new Error('Car not found after update');
  
  return updated;
};

export const deleteCar = async (id: number): Promise<void> => {
  const db = await initDatabase();
  db.run('DELETE FROM cars WHERE id = ?', [id]);
};
