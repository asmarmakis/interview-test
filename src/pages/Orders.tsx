
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { Plus, Package } from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Manajemen Pesanan</h1>
                <p className="text-orange-100 mt-1">Kelola pesanan pelanggan dengan mudah</p>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl">
              <Plus className="h-5 w-5" />
              Tambah Pesanan
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="flex justify-center mb-8">
         {/*  <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Cari berdasarkan nama pelanggan, email, atau ID pesanan..."
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Orders;
