
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { mockPayments, mockUsers, mockUnits, mockProperties } from '@/lib/mockData';
import { format } from 'date-fns';
import { CreditCard, Download, Plus, Search } from 'lucide-react';
import StatsCard from '@/components/cards/StatsCard';
import { useAuth } from '@/contexts/AuthContext';
import { PaymentType } from '@/lib/types';

const Payments = () => {
  // In a real app, we would fetch payments from Supabase
  const payments = [...mockPayments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const completedPayments = payments.filter(p => p.status === 'completed');
  const overduePayments = pendingPayments.filter(p => new Date(p.dueDate) < new Date());
  
  const totalPendingAmount = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalPaidAmount = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  const getTenantName = (tenantId: string) => {
    const tenant = mockUsers.find(user => user.id === tenantId);
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown';
  };
  
  const getUnitInfo = (unitId: string) => {
    const unit = mockUnits.find(u => u.id === unitId);
    if (!unit) return 'Unknown';
    
    const property = mockProperties.find(p => p.id === unit.propertyId);
    return `${property?.name} - Unit ${unit.unitNumber}`;
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
  
  const getStatusBadge = (status: string, dueDate: string) => {
    switch (status) {
      case 'completed':
        return <span className="payment-badge-paid">Paid</span>;
      case 'pending':
        const isOverdue = new Date(dueDate) < new Date();
        return isOverdue ? 
          <span className="payment-badge-overdue">Overdue</span> : 
          <span className="payment-badge-pending">Pending</span>;
      case 'failed':
        return <span className="payment-badge-overdue">Failed</span>;
      default:
        return null;
    }
  };
  
  const handleDownloadReceipt = (paymentId: string) => {
    // In a real app, this would generate and download a receipt PDF
    alert(`Downloading receipt for payment ${paymentId}`);
  };

  return (
    <AdminLayout title="Payments">
      <div className="space-y-6">
        {/* Payment Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Collected"
            value={`KES ${totalPaidAmount.toLocaleString()}`}
            icon={CreditCard}
            iconClassName="bg-green-50 text-green-600"
          />
          <StatsCard
            title="Pending Payments"
            value={pendingPayments.length}
            icon={CreditCard}
            iconClassName="bg-blue-50 text-blue-600"
          />
          <StatsCard
            title="Overdue Payments"
            value={overduePayments.length}
            icon={CreditCard}
            iconClassName="bg-red-50 text-red-600"
          />
          <StatsCard
            title="Outstanding Amount"
            value={`KES ${totalPendingAmount.toLocaleString()}`}
            icon={CreditCard}
            iconClassName="bg-yellow-50 text-yellow-600"
          />
        </div>
        
        {/* Payments Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
              <CardTitle>Payment Records</CardTitle>
              <Button 
                onClick={() => alert('Add manual payment')}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Payment
              </Button>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Paid</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>
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
              </div>
            </div>
            
            {/* Payments Table */}
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {getTenantName(payment.tenantId)}
                      </TableCell>
                      <TableCell>{getUnitInfo(payment.unitId)}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>
                        {format(new Date(payment.dueDate), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>{getPaymentTypeLabel(payment.type)}</TableCell>
                      <TableCell className="text-right">
                        KES {payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status, payment.dueDate)}</TableCell>
                      <TableCell className="text-right space-x-1">
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Payments;
