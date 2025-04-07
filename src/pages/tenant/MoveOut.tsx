import React, { useState } from 'react';
import TenantLayout from '@/components/layouts/TenantLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle, Clock, DoorOpen, AlertTriangle } from 'lucide-react';
import { mockMoveOutRequests, mockUnits } from '@/lib/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const MoveOut = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acknowledgeTerms, setAcknowledgeTerms] = useState(false);
  
  // In a real app, we would fetch the move-out request for the logged-in tenant from Supabase
  const existingRequest = mockMoveOutRequests[0]; // Assuming tenant has one existing request
  
  // Find tenant's unit
  const tenantUnit = mockUnits.find(unit => unit.tenantId === user?.id);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast.error('Please select a move-out date');
      return;
    }
    
    if (!reason) {
      toast.error('Please provide a reason for moving out');
      return;
    }
    
    if (!acknowledgeTerms) {
      toast.error('Please acknowledge the move-out terms');
      return;
    }
    
    setIsConfirmationModalOpen(true);
  };
  
  const confirmMoveOut = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, we would submit the move-out request to Supabase
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Move-out request submitted successfully');
      setIsConfirmationModalOpen(false);
      
      // Reset form
      setSelectedDate(undefined);
      setReason('');
      setAcknowledgeTerms(false);
    } catch (error) {
      toast.error('Failed to submit move-out request');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If there's no tenant unit assigned, show a message
  if (!tenantUnit) {
    return (
      <TenantLayout title="Move Out Request">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No unit assigned</AlertTitle>
          <AlertDescription>
            You don't have any unit assigned to your account. Please contact the property manager.
          </AlertDescription>
        </Alert>
      </TenantLayout>
    );
  }

  return (
    <TenantLayout title="Move Out Request">
      <div className="space-y-6">
        {/* Existing Request Status (if applicable) */}
        {existingRequest && (
          <Alert className={existingRequest.status === 'pending' ? 'bg-blue-50' : 'bg-green-50'}>
            {existingRequest.status === 'pending' ? (
              <>
                <Clock className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-600">Request Pending</AlertTitle>
                <AlertDescription>
                  Your move-out request for {format(new Date(existingRequest.moveOutDate), 'MMMM d, yyyy')} is currently pending approval. 
                  You will be notified once it's approved or denied.
                </AlertDescription>
              </>
            ) : existingRequest.status === 'approved' ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600">Request Approved</AlertTitle>
                <AlertDescription>
                  Your move-out request for {format(new Date(existingRequest.moveOutDate), 'MMMM d, yyyy')} has been approved. 
                  Please see below for your move-out checklist.
                </AlertDescription>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-600">Request Denied</AlertTitle>
                <AlertDescription>
                  Your move-out request was denied. Please contact the property manager for more details.
                </AlertDescription>
              </>
            )}
          </Alert>
        )}
        
        {/* Move-Out Request Form */}
        {!existingRequest && (
          <Card>
            <CardHeader>
              <CardTitle>Submit Move Out Request</CardTitle>
              <CardDescription>
                Please provide details about your intention to move out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Unit Info */}
                  <div className="space-y-2">
                    <Label>Current Unit</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      Unit {tenantUnit.unitNumber}
                    </div>
                  </div>
                  
                  {/* Lease End Date */}
                  <div className="space-y-2">
                    <Label>Lease End Date</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      {tenantUnit.leaseEndDate ? (
                        format(new Date(tenantUnit.leaseEndDate), 'MMMM d, yyyy')
                      ) : (
                        'Not specified'
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Move-out Date */}
                <div className="space-y-2">
                  <Label>Intended Move-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "MMMM d, yyyy") : <span>Select a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Reason */}
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Moving Out</Label>
                  <Input
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="E.g., Relocating for work"
                  />
                </div>
                
                {/* Terms Agreement */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={acknowledgeTerms}
                      onCheckedChange={(checked) => setAcknowledgeTerms(!!checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I acknowledge and agree to the move-out terms
                      </label>
                      <p className="text-sm text-gray-500">
                        I understand that I need to give at least 30 days notice, and that I am responsible for any damages beyond normal wear and tear.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="w-full sm:w-auto">
                  Submit Move-out Request
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        
        {/* Move-Out Checklist (show if request is approved or for informational purposes) */}
        <Card>
          <CardHeader>
            <CardTitle>Move-Out Checklist</CardTitle>
            <CardDescription>
              {existingRequest && existingRequest.status === 'approved' 
                ? 'Complete these items before your move-out date.'
                : 'When your move-out request is approved, you will need to complete these items.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox id="checklist-1" disabled />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="checklist-1"
                    className="text-sm font-medium leading-none"
                  >
                    Schedule a move-out inspection
                  </label>
                  <p className="text-sm text-gray-500">
                    Contact the property manager to schedule a final inspection at least 3 days before your move-out date.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox id="checklist-2" disabled />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="checklist-2"
                    className="text-sm font-medium leading-none"
                  >
                    Clear any outstanding balances
                  </label>
                  <p className="text-sm text-gray-500">
                    Ensure all rent and utility payments are up to date before moving out.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox id="checklist-3" disabled />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="checklist-3"
                    className="text-sm font-medium leading-none"
                  >
                    Clean the apartment
                  </label>
                  <p className="text-sm text-gray-500">
                    Thoroughly clean all areas including kitchen, bathroom, floors, and windows.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox id="checklist-4" disabled />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="checklist-4"
                    className="text-sm font-medium leading-none"
                  >
                    Return all keys and access cards
                  </label>
                  <p className="text-sm text-gray-500">
                    Hand over all keys, remote controls, and access cards to the property manager.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox id="checklist-5" disabled />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="checklist-5"
                    className="text-sm font-medium leading-none"
                  >
                    Provide forwarding address
                  </label>
                  <p className="text-sm text-gray-500">
                    Provide a forwarding address for security deposit return and mail forwarding.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Confirmation Modal */}
      <Dialog open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Move-Out Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this move-out request?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="font-medium">Move-Out Date</p>
              <p>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : ''}</p>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">Reason</p>
              <p>{reason}</p>
            </div>
            
            <Alert className="bg-yellow-50 border-yellow-100">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-600">Important Notice</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Once submitted, you can't edit this request. The property manager will review it and get back to you.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmationModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmMoveOut} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Confirm Move-Out Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TenantLayout>
  );
};

export default MoveOut;
