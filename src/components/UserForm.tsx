
import { useState, useEffect } from 'react';
import { User, CreateUserRequest } from '@/types/User';
import { X } from 'lucide-react';

interface UserFormProps {
  user?: User | null;
  onSubmit: (userData: CreateUserRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const UserForm = ({ user, onSubmit, onCancel, isLoading = false }: UserFormProps) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md border border-border">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">
            {user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-card-foreground mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-1">
              Telepon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-card-foreground mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Menyimpan...' : (user ? 'Update' : 'Tambah')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
