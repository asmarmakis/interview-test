export interface Car {
  id: string;
  name: string;
  image: string;
  month_rate: number;
  day_rate: number;
}

export interface CreateCarRequest {
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  mileage: number;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  status: 'available' | 'sold' | 'maintenance';
  description?: string;
}
