import React, { useState } from 'react';
import TenantLayout from '@/components/layouts/TenantLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockMaintenanceRequests } from '@/lib/mockData';
import { toast } from 'sonner';
import MaintenanceRequestCard from '@/components/cards/MaintenanceRequestCard';
import { Camera, Info, Wrench, Upload } from 'lucide-react';
import { MaintenanceRequest, MaintenanceStatus } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';

const Maintenance = () => {
  const { user } = useAuth();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const maintenanceRequests = mockMaintenanceRequests;
  
  const submittedRequests = maintenanceRequests.filter(r => r.status === 'submitted');
  const inProgressRequests = maintenanceRequests.filter(r => r.status === 'in_progress');
  const completedRequests = maintenanceRequests.filter(r => r.status === 'completed');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleSubmitRequest = async () => {
    if (!description) {
      toast.error('Please provide a description of the issue');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsRequestModalOpen(false);
      setDescription('');
      setSelectedFile(null);
      
      toast.success('Maintenance request submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit maintenance request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const viewRequestDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };
  
  const getStatusText = (status: MaintenanceStatus): string => {
    switch (status) {
      case 'submitted': return 'Your request has been submitted and is awaiting review.';
      case 'in_progress': return 'Your request is currently being addressed by our maintenance team.';
      case 'completed': return 'This maintenance issue has been resolved.';
      default: return '';
    }
  };
  
  const getStatusColor = (status: MaintenanceStatus): string => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TenantLayout title="Maintenance Requests">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Maintenance Requests</h1>
            <p className="text-gray-500">
              Submit and track maintenance issues in your apartment
            </p>
          </div>
          <Button 
            onClick={() => setIsRequestModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Wrench size={16} />
            New Request
          </Button>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">
              Active ({submittedRequests.length + inProgressRequests.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({maintenanceRequests.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {submittedRequests.concat(inProgressRequests).length > 0 ? (
                submittedRequests.concat(inProgressRequests).map(request => (
                  <MaintenanceRequestCard
                    key={request.id}
                    request={request}
                    onViewDetails={() => viewRequestDetails(request)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Wrench className="mx-auto mb-3 text-gray-400" size={36} />
                  <p className="text-gray-500 mb-2">No active maintenance requests</p>
                  <Button variant="outline" onClick={() => setIsRequestModalOpen(true)}>
                    Submit a new request
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedRequests.length > 0 ? (
                completedRequests.map(request => (
                  <MaintenanceRequestCard
                    key={request.id}
                    request={request}
                    onViewDetails={() => viewRequestDetails(request)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Info className="mx-auto mb-3 text-gray-400" size={36} />
                  <p className="text-gray-500">No completed maintenance requests</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {maintenanceRequests.length > 0 ? (
                maintenanceRequests.map(request => (
                  <MaintenanceRequestCard
                    key={request.id}
                    request={request}
                    onViewDetails={() => viewRequestDetails(request)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Info className="mx-auto mb-3 text-gray-400" size={36} />
                  <p className="text-gray-500 mb-2">No maintenance requests yet</p>
                  <Button variant="outline" onClick={() => setIsRequestModalOpen(true)}>
                    Submit your first request
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>How to Submit a Maintenance Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center mb-3">
                  <span className="font-bold text-rentalsync-primary">1</span>
                </div>
                <h3 className="font-medium mb-2">Describe the Issue</h3>
                <p className="text-sm text-gray-600">
                  Provide a detailed description of the maintenance issue you're experiencing.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center mb-3">
                  <span className="font-bold text-rentalsync-primary">2</span>
                </div>
                <h3 className="font-medium mb-2">Add a Photo (Optional)</h3>
                <p className="text-sm text-gray-600">
                  Upload a photo of the issue to help our maintenance team better understand the problem.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center mb-3">
                  <span className="font-bold text-rentalsync-primary">3</span>
                </div>
                <h3 className="font-medium mb-2">Track Your Request</h3>
                <p className="text-sm text-gray-600">
                  Once submitted, you can track the status of your request and receive updates.
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              For emergency maintenance issues that pose an immediate threat to safety or property,
              please contact the emergency maintenance line directly at +254-XXX-XXX-XXX.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Maintenance Request</DialogTitle>
            <DialogDescription>
              Describe the issue you're experiencing in your apartment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., Leaky faucet in kitchen sink"
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="photo">Photo (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                {selectedFile ? (
                  <div className="space-y-2">
                    <p className="text-sm break-all">{selectedFile.name}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <Camera className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="mt-2 flex flex-col items-center text-sm text-gray-500">
                      <span>Drag and drop a file here, or</span>
                      <label className="mt-2 cursor-pointer">
                        <span className="text-rentalsync-primary hover:underline">Browse files</span>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Upload a clear photo of the issue to help our team diagnose the problem.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitRequest} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maintenance Request Details</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className={`rounded-md px-3 py-2 text-sm ${getStatusColor(selectedRequest.status)}`}>
                {getStatusText(selectedRequest.status)}
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  {selectedRequest.description}
                </div>
              </div>
              
              {selectedRequest.photoUrl && (
                <div className="space-y-2">
                  <Label>Photo</Label>
                  <img 
                    src={selectedRequest.photoUrl}
                    alt="Maintenance issue" 
                    className="w-full rounded-md border border-gray-200"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Submitted on</Label>
                  <p>
                    {new Date(selectedRequest.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Last Updated</Label>
                  <p>
                    {new Date(selectedRequest.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TenantLayout>
  );
};

export default Maintenance;
