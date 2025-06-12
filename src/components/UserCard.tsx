
import { User } from '@/types/User';
import { Edit, Trash2, Mail, Phone, Globe } from 'lucide-react';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{user.name}</h3>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user)}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-all duration-200"
            title="Edit User"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all duration-200"
            title="Delete User"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>{user.website}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Company:</span> {user.company.name}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {user.company.catchPhrase}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
