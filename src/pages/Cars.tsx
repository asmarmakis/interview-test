
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { Plus, Car as CarIcon } from 'lucide-react';

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CarIcon className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Manajemen Mobil</h1>
                <p className="text-purple-100 mt-1">Kelola inventori mobil dengan mudah</p>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl">
              <Plus className="h-5 w-5" />
              Tambah Mobil
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="flex justify-center mb-8">
        {/*   <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Cari berdasarkan merk, model, atau warna..."
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Cars;
