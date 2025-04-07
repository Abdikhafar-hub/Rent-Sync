
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { mockUsers, mockProperties, mockUnits } from '@/lib/mockData';
import { User, Property, Unit } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle, Plus, Search } from 'lucide-react';

const Tenants = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, we would fetch tenants, properties, and units from Supabase
  const tenants = mockUsers.filter(user => user.role === 'tenant');
  const properties = mockProperties;
  
  // Get all units or filter by selected property
  const availableUnits = mockUnits.filter(unit => 
    unit.status === 'vacant' && 
    (selectedProperty === 'all' || unit.propertyId === selectedProperty)
  );
  
  const handleInviteTenant = async () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    if (!selectedUnit) {
      toast.error('Please select a unit');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send an invitation email to the tenant
      // and create an unassigned user in Supabase
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Invitation sent to ${inviteEmail}`);
      setIsInviteModalOpen(false);
      
      // Reset form
      setInviteEmail('');
      setSelectedUnit('');
    } catch (error) {
      toast.error('Failed to send invitation');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getUnitInfo = (tenantId: string): string => {
    const unit = mockUnits.find(u => u.tenantId === tenantId);
    if (!unit) return 'No unit assigned';
    
    const property = mockProperties.find(p => p.id === unit.propertyId);
    return `${property?.name} - Unit ${unit.unitNumber}`;
  };
  
  const handleViewTenant = (tenantId: string) => {
    // In a real app, this would navigate to the tenant details page
    toast.info(`Viewing tenant ${tenantId}`);
  };

  return (
    <AdminLayout title="Tenants">
      <div className="space-y-6">
        {/* Header with Search and Invite Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Tenants</h1>
            <p className="text-gray-500">
              Manage your tenants and their unit assignments
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search tenants..." 
                className="pl-8 w-full sm:w-[250px]"
              />
            </div>
            <Button 
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Invite Tenant
            </Button>
          </div>
        </div>
        
        {/* Tenants Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>All Tenants</CardTitle>
              
              <Select 
                value={selectedProperty} 
                onValueChange={setSelectedProperty}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by Property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  {properties.map(property => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map(tenant => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">
                      {tenant.firstName} {tenant.lastName}
                    </TableCell>
                    <TableCell>{tenant.email}</TableCell>
                    <TableCell>{tenant.phoneNumber}</TableCell>
                    <TableCell>{getUnitInfo(tenant.id)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewTenant(tenant.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {tenants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-gray-500 mb-2">No tenants found</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsInviteModalOpen(true)}
                        >
                          Invite Tenant
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Invite Tenant Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New Tenant</DialogTitle>
            <DialogDescription>
              Send an invitation to a new tenant and assign them to a unit
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tenant-email">Email Address</Label>
              <Input
                id="tenant-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="tenant@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="property">Property</Label>
              <Select 
                value={selectedProperty} 
                onValueChange={setSelectedProperty}
              >
                <SelectTrigger id="property">
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  {properties.map(property => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select 
                value={selectedUnit} 
                onValueChange={setSelectedUnit}
                disabled={availableUnits.length === 0}
              >
                <SelectTrigger id="unit">
                  <SelectValue placeholder={availableUnits.length > 0 ? "Select a unit" : "No vacant units available"} />
                </SelectTrigger>
                <SelectContent>
                  {availableUnits.map(unit => (
                    <SelectItem key={unit.id} value={unit.id}>
                      Unit {unit.unitNumber} - KES {unit.rentAmount.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md flex">
              <CheckCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" size={18} />
              <p className="text-sm text-blue-700">
                An email invitation will be sent to the tenant with instructions to create their account.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteTenant} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Tenants;
