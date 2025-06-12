import { useState, useEffect } from 'react';
import { Users, Car as CarIcon, Package, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Car } from '../types/Car';

const Index = () => {
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for car data
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState({
    name: '',
    model: '',
    year: '',
    price: ''
  });

  // State for order data
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    carId: '',
    orderDate: '',
    status: 'pending'
  });

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars');
        if (!response.ok) throw new Error('Failed to fetch cars');
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleAddCar = (e) => {
    e.preventDefault();
    setCars([...cars, { ...newCar, id: Date.now() }]);
    setNewCar({ name: '', model: '', year: '', price: '' });
    setIsCarModalOpen(false);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    setOrders([...orders, { ...newOrder, id: Date.now() }]);
    setNewOrder({ customerName: '', carId: '', orderDate: '', status: 'pending' });
    setIsOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Dashboard Pengguna</h1>
                <p className="text-blue-100 mt-1">Kelola data pengguna dengan mudah</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsCarModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <CarIcon className="h-5 w-5" />
                Tambah Mobil
              </button>
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Package className="h-5 w-5" />
                Tambah Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Car Modal */}
      {isCarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tambah Mobil Baru</h2>
              <button onClick={() => setIsCarModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddCar}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Mobil"
                  value={newCar.name}
                  onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Model"
                  value={newCar.model}
                  onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Tahun"
                  value={newCar.year}
                  onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={newCar.price}
                  onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tambah Pesanan Baru</h2>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddOrder}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Pelanggan"
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <select
                  value={newOrder.carId}
                  onChange={(e) => setNewOrder({ ...newOrder, carId: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Pilih Mobil</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name} - {car.model}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newOrder.orderDate}
                  onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading && <div className="text-center">Loading cars...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={car.image} 
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                <div className="flex justify-between text-gray-600">
                  <p>Monthly: ${car.month_rate}</p>
                  <p>Daily: ${car.day_rate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
