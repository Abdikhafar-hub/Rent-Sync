
import React from 'react';
import { Payment } from '@/lib/types';
import { format } from 'date-fns';
import { CreditCard, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentCardProps {
  payment: Payment;
  onPayNow?: () => void;
  hideButton?: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ 
  payment, 
  onPayNow,
  hideButton = false
}) => {
  const getStatusBadge = () => {
    switch (payment.status) {
      case 'completed':
        return (
          <div className="payment-badge-paid flex items-center">
            <CheckCircle size={12} className="mr-1" />
            Paid
          </div>
        );
      case 'pending':
        const dueDate = new Date(payment.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today;
        
        if (isOverdue) {
          return (
            <div className="payment-badge-overdue flex items-center">
              <AlertCircle size={12} className="mr-1" />
              Overdue
            </div>
          );
        }
        return (
          <div className="payment-badge-pending flex items-center">
            <Clock size={12} className="mr-1" />
            Pending
          </div>
        );
      case 'failed':
        return (
          <div className="payment-badge-overdue flex items-center">
            <AlertCircle size={12} className="mr-1" />
            Failed
          </div>
        );
      default:
        return null;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="mr-3 bg-blue-50 p-2 rounded-full">
            <CreditCard size={20} className="text-rentalsync-primary" />
          </div>
          <div>
            <p className="font-medium">{payment.description}</p>
            <p className="text-sm text-gray-500">
              Due: {format(new Date(payment.dueDate), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <div>{getStatusBadge()}</div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">{formatAmount(payment.amount)}</p>
        {!hideButton && payment.status === 'pending' && onPayNow && (
          <Button onClick={onPayNow} size="sm">Pay Now</Button>
        )}
      </div>
      
      {payment.paidAt && (
        <p className="text-xs text-gray-500 mt-2">
          Paid on {format(new Date(payment.paidAt), 'MMM d, yyyy h:mm a')}
        </p>
      )}
    </div>
  );
};

export default PaymentCard;
