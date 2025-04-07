
import React from 'react';
import TenantLayout from '@/components/layouts/TenantLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPayments } from '@/lib/mockData';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, FileText, Filter, Search } from 'lucide-react';
import { PaymentType } from '@/lib/types';

const PaymentHistory = () => {
  // In a real app, we would fetch payment history for the logged-in tenant from Supabase
  const paymentHistory = [...mockPayments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="payment-badge-paid">Paid</span>;
      case 'pending':
        return <span className="payment-badge-pending">Pending</span>;
      case 'failed':
        return <span className="payment-badge-overdue">Failed</span>;
      default:
        return null;
    }
  };
  
  const getPaymentTypeLabel = (type: PaymentType) => {
    switch (type) {
      case 'rent':
        return 'Rent';
      case 'utility':
        return 'Utility';
      case 'late_fee':
        return 'Late Fee';
      default:
        return type;
    }
  };
  
  const handleDownloadReceipt = (paymentId: string) => {
    // In a real app, this would generate and download a PDF receipt
    alert(`Downloading receipt for payment ${paymentId}`);
  };

  return (
    <TenantLayout title="Payment History">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="flex w-full items-center gap-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search payments..." 
                  className="max-w-xs"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-[180px]">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="utility">Utilities</SelectItem>
                      <SelectItem value="late_fee">Late Fees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-[180px]">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Payment History Table */}
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.description}</TableCell>
                      <TableCell>
                        {payment.paidAt 
                          ? format(new Date(payment.paidAt), 'MMM d, yyyy')
                          : format(new Date(payment.dueDate), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>{getPaymentTypeLabel(payment.type)}</TableCell>
                      <TableCell className="text-right">
                        KES {payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        {payment.status === 'completed' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 p-1"
                            onClick={() => handleDownloadReceipt(payment.id)}
                          >
                            <Download size={16} />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {paymentHistory.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto mb-3 text-gray-400" size={32} />
                <p className="text-gray-500">No payment records found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
};

export default PaymentHistory;
