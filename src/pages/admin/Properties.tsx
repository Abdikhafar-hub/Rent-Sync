
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { mockProperties, mockUnits } from '@/lib/mockData';
import PropertyCard from '@/components/cards/PropertyCard';
import { Building, Plus, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Properties = () => {
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyAddress, setNewPropertyAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, we would fetch properties from Supabase for the logged-in admin
  const properties = mockProperties;
  
  const handleAddProperty = async () => {
    if (!newPropertyName || !newPropertyAddress) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would add the property to Supabase
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Property "${newPropertyName}" added successfully`);
      setIsAddPropertyModalOpen(false);
      
      // Reset form
      setNewPropertyName('');
      setNewPropertyAddress('');
    } catch (error) {
      toast.error('Failed to add property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Properties">
      <div className="space-y-6">
        {/* Header with Search and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Properties</h1>
            <p className="text-gray-500">
              Manage your rental properties
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search properties..." 
                className="pl-8 w-full sm:w-[250px]"
              />
            </div>
            <Button 
              onClick={() => setIsAddPropertyModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add Property
            </Button>
          </div>
        </div>
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => {
            // Calculate unit and tenant count for this property
            const propertyUnits = mockUnits.filter(unit => unit.propertyId === property.id);
            const tenantCount = propertyUnits.filter(unit => unit.tenantId).length;
            
            return (
              <PropertyCard
                key={property.id}
                property={property}
                unitCount={propertyUnits.length}
                tenantCount={tenantCount}
                onViewDetails={() => toast.info(`Viewing details for ${property.name}`)}
              />
            );
          })}
          
          {properties.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Building className="mx-auto mb-3 text-gray-400" size={36} />
              <p className="text-gray-500 mb-4">No properties added yet</p>
              <Button onClick={() => setIsAddPropertyModalOpen(true)}>
                Add Your First Property
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Property Modal */}
      <Dialog open={isAddPropertyModalOpen} onOpenChange={setIsAddPropertyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Enter the details of the new property
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="property-name">Property Name</Label>
              <Input
                id="property-name"
                value={newPropertyName}
                onChange={(e) => setNewPropertyName(e.target.value)}
                placeholder="E.g., Sunset Apartments"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="property-address">Address</Label>
              <Input
                id="property-address"
                value={newPropertyAddress}
                onChange={(e) => setNewPropertyAddress(e.target.value)}
                placeholder="E.g., 123 Main St, Nairobi"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPropertyModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProperty} disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Property'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Properties;
