
import { Car } from '@/types/Car';
import { Edit, Trash2, Car as CarIcon, Fuel, Settings } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void;
}

const CarCard = ({ car, onEdit, onDelete }: CarCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };



  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {car.name}
          </h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-muted-foreground">Per Bulan: {formatPrice(car.month_rate)}</p>
            <p className="text-sm text-muted-foreground">Per Hari: {formatPrice(car.day_rate)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(car)}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-all duration-200"
            title="Edit Car"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(car.id)}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all duration-200"
            title="Delete Car"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CarIcon className="h-4 w-4" />
          <span>{car.transmission}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Fuel className="h-4 w-4" />
          <span>{car.fuelType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Settings className="h-4 w-4" />
          <span>{car.mileage.toLocaleString()} km</span>
        </div>
      </div>
      
      <div className="border-t border-border pt-4">
        <p className="text-lg font-bold text-primary">
          {formatPrice(car.price)}
        </p>
        {car.description && (
          <p className="text-sm text-muted-foreground mt-2">
            {car.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CarCard;
