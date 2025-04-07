
import React, { useState } from 'react';
import TenantLayout from '@/components/layouts/TenantLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockPayments } from '@/lib/mockData';
import { toast } from 'sonner';
import PaymentCard from '@/components/cards/PaymentCard';
import { CreditCard, Phone } from 'lucide-react';
import { Payment } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';

const Payments = () => {
  const { user } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Filter for pending payments for this user
  const pendingPayments = mockPayments.filter(p => p.status === 'pending');
  
  const openPaymentModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsPaymentModalOpen(true);
  };
  
  const handlePayment = async () => {
    if (!selectedPayment) return;
    
    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate M-Pesa API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      toast.success(`Payment request sent to ${phoneNumber}. Check your phone for the M-Pesa prompt.`);
      
      setIsPaymentModalOpen(false);
      setSelectedPayment(null);
      
      // In a real app, we would wait for the callback from M-Pesa before showing this
      // Here we're just simulating it with a timeout
      setTimeout(() => {
        toast.success(`Payment of KES ${selectedPayment.amount.toLocaleString()} completed successfully!`);
      }, 3000);
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const calculateTotalDue = () => {
    return pendingPayments.reduce((total, payment) => total + payment.amount, 0);
  };

  return (
    <TenantLayout title="Make Payments">
      <div className="space-y-6">
        {/* Summary Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>
                <p className="text-gray-500">
                  You have {pendingPayments.length} pending payment{pendingPayments.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Due</p>
                  <p className="text-2xl font-bold">KES {calculateTotalDue().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Pending Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingPayments.length > 0 ? (
              pendingPayments.map(payment => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  onPayNow={() => openPaymentModal(payment)}
                />
              ))
            ) : (
              <div className="text-center py-10">
                <CreditCard className="mx-auto mb-3 text-gray-400" size={32} />
                <p className="text-gray-500">No pending payments.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Payment Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2 flex items-center">
                <Phone size={18} className="mr-2" />
                M-Pesa Payment Process
              </h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Click the "Pay Now" button next to the payment you wish to make.</li>
                <li>Enter your M-Pesa registered phone number.</li>
                <li>You will receive an STK push notification on your phone.</li>
                <li>Enter your M-Pesa PIN to authorize the payment.</li>
                <li>You will receive a confirmation once the payment is complete.</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">
                Note: A small transaction fee (1%) will be added to cover M-Pesa processing costs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>
              You'll receive an M-Pesa prompt on your phone to authorize this payment.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Payment for</p>
                  <p className="font-medium">{selectedPayment.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">KES {selectedPayment.amount.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Transaction Fee (1%)</p>
                  <p className="font-medium">KES {Math.round(selectedPayment.amount * 0.01).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold">KES {Math.round(selectedPayment.amount * 1.01).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+254712345678"
                />
                <p className="text-xs text-gray-500">Include country code (e.g., +254)</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TenantLayout>
  );
};

export default Payments;
