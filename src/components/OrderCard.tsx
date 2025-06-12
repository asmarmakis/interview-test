
import { Order } from '@/types/Order';
import { Edit, Trash2, User, Mail, Phone, Calendar, CreditCard } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onEdit: (order: Order) => void;
  onDelete: (id: number) => void;
}

const OrderCard = ({ order, onEdit, onDelete }: OrderCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">
            Order #{order.id}
          </h3>
          <p className="text-sm text-muted-foreground">Car ID: {order.carId}</p>
          <div className="flex gap-2 mt-2">
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </div>
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(order)}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-all duration-200"
            title="Edit Order"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(order.id)}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all duration-200"
            title="Delete Order"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{order.customerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{order.customerEmail}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{order.customerPhone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Order: {order.orderDate}</span>
        </div>
        {order.deliveryDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Delivery: {order.deliveryDate}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CreditCard className="h-4 w-4" />
          <span>{order.paymentMethod}</span>
        </div>
      </div>
      
      <div className="border-t border-border pt-4">
        <p className="text-lg font-bold text-primary">
          {formatPrice(order.totalAmount)}
        </p>
        {order.notes && (
          <p className="text-sm text-muted-foreground mt-2">
            {order.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
