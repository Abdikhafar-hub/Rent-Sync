
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format, addDays } from 'date-fns';
import { MoveOutStatus, MoveOutRequest } from '@/lib/types';
import { mockUsers, mockUnits } from '@/lib/mockData';
import { DoorOpen, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

// Mock move-out requests data
const initialRequests: MoveOutRequest[] = [
  {
    id: 'req-1',
    tenantId: 'tenant-1',
    unitId: 'unit-1',
    moveOutDate: addDays(new Date(), 30).toISOString(),
    status: 'pending',
    createdAt: '2023-08-01T10:15:00Z',
    updatedAt: '2023-08-01T10:15:00Z',
  },
  {
    id: 'req-2',
    tenantId: 'tenant-2',
    unitId: 'unit-2',
    moveOutDate: addDays(new Date(), 45).toISOString(),
    status: 'approved',
    createdAt: '2023-07-15T14:30:00Z',
    updatedAt: '2023-07-16T09:20:00Z',
  },
  {
    id: 'req-3',
    tenantId: 'tenant-3',
    unitId: 'unit-3',
    moveOutDate: addDays(new Date(), 15).toISOString(),
    status: 'pending',
    createdAt: '2023-08-05T16:45:00Z',
    updatedAt: '2023-08-05T16:45:00Z',
  }
];

const MoveOut = () => {
  const [moveOutRequests, setMoveOutRequests] = useState<MoveOutRequest[]>(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<MoveOutRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<MoveOutStatus | 'all'>('all');
  const [processingAction, setProcessingAction] = useState(false);
  
  // Filter requests based on status filter
  const filteredRequests = moveOutRequests.filter(request => 
    filterStatus === 'all' || request.status === filterStatus
  ).sort((a, b) => new Date(a.moveOutDate).getTime() - new Date(b.moveOutDate).getTime());
  
  // Find tenant details by ID
  const getTenantDetails = (tenantId: string) => {
    const tenant = mockUsers.find(user => user.id === tenantId);
    return {
      name: tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown Tenant',
      email: tenant?.email || 'N/A',
      phone: tenant?.phoneNumber || 'N/A',
    };
  };
  
  // Find unit details by ID
  const getUnitDetails = (unitId: string) => {
    const unit = mockUnits.find(u => u.id === unitId);
    return {
      unitNumber: unit?.unitNumber || 'Unknown',
      rentAmount: unit?.rentAmount || 0,
    };
  };
  
  // Handle opening request details modal
  const handleViewDetails = (request: MoveOutRequest) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };
  
  // Handle approve/deny request
  const handleUpdateStatus = async (requestId: string, newStatus: MoveOutStatus) => {
    setProcessingAction(true);
    
    try {
      // In a real app, this would update the status in the Supabase database
      // and potentially trigger notifications
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the local state
      const updatedRequests = moveOutRequests.map(req => 
        req.id === requestId 
          ? { ...req, status: newStatus, updatedAt: new Date().toISOString() } 
          : req
      );
      
      setMoveOutRequests(updatedRequests);
      
      if (newStatus === 'approved') {
        toast.success('Move-out request approved');
      } else {
        toast.success('Move-out request denied');
      }
      
      setIsDetailsModalOpen(false);
    } catch (error) {
      toast.error('Failed to update request status');
      console.error('Update error:', error);
    } finally {
      setProcessingAction(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  // Get status badge for display
  const getStatusBadge = (status: MoveOutStatus) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex gap-1 items-center">
            <AlertTriangle size={12} />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center">
            <CheckCircle size={12} />
            Approved
          </Badge>
        );
      case 'denied':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex gap-1 items-center">
            <XCircle size={12} />
            Denied
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <AdminLayout title="Move-Out Requests">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Move-Out Request Management</h1>
            <p className="text-gray-500">
              Review and process tenant move-out requests
            </p>
          </div>
        </div>
        
        {/* Requests Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Move-Out Requests</CardTitle>
              
              <Select
                value={filterStatus}
                onValueChange={(value) => setFilterStatus(value as MoveOutStatus | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Move-Out Date</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => {
                    const tenant = getTenantDetails(request.tenantId);
                    const unit = getUnitDetails(request.unitId);
                    
                    return (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{tenant.name}</TableCell>
                        <TableCell>Unit {unit.unitNumber}</TableCell>
                        <TableCell>{formatDate(request.moveOutDate)}</TableCell>
                        <TableCell>{formatDate(request.createdAt)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(request)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <DoorOpen className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-gray-500">No move-out requests found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Request Details Modal */}
      {selectedRequest && (
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Move-Out Request Details</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Tenant</p>
                <p className="font-medium">{getTenantDetails(selectedRequest.tenantId).name}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Unit</p>
                <p className="font-medium">Unit {getUnitDetails(selectedRequest.unitId).unitNumber}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Move-Out Date</p>
                <p className="font-medium">{formatDate(selectedRequest.moveOutDate)}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Request Date</p>
                <p className="font-medium">{formatDate(selectedRequest.createdAt)}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="font-medium">{getStatusBadge(selectedRequest.status)}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <p className="font-medium">{formatDate(selectedRequest.updatedAt)}</p>
              </div>
            </div>
            
            {selectedRequest.status === 'pending' && (
              <div className="bg-yellow-50 p-4 rounded-md mb-4">
                <div className="flex space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-yellow-700">
                      This request requires your action.
                    </p>
                    <p className="text-sm text-yellow-600">
                      Approving this request will mark the unit for vacancy on {formatDate(selectedRequest.moveOutDate)}.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              {selectedRequest.status === 'pending' ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'denied')}
                    disabled={processingAction}
                  >
                    Deny Request
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'approved')}
                    disabled={processingAction}
                  >
                    Approve Request
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsDetailsModalOpen(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default MoveOut;
