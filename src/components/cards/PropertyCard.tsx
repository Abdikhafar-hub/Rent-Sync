
import React from 'react';
import { Building, Users, Home } from 'lucide-react';
import { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  property: Property;
  unitCount: number;
  tenantCount: number;
  onViewDetails: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  unitCount,
  tenantCount,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center mb-4">
        <div className="bg-blue-50 p-3 rounded-full mr-4">
          <Building className="text-rentalsync-primary" size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{property.name}</h3>
          <p className="text-gray-500 text-sm">{property.address}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4 border-t border-b border-gray-100 py-3">
        <div className="flex items-center">
          <Home size={18} className="text-gray-400 mr-2" />
          <span className="text-sm">{unitCount} Units</span>
        </div>
        <div className="flex items-center">
          <Users size={18} className="text-gray-400 mr-2" />
          <span className="text-sm">{tenantCount} Tenants</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => onViewDetails(property.id)}
      >
        View Details
      </Button>
    </div>
  );
};

export default PropertyCard;
