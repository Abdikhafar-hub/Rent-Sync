
import React from 'react';
import { MaintenanceRequest } from '@/lib/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface MaintenanceRequestCardProps {
  request: MaintenanceRequest;
  onViewDetails?: (requestId: string) => void;
}

const MaintenanceRequestCard: React.FC<MaintenanceRequestCardProps> = ({
  request,
  onViewDetails,
}) => {
  const getStatusBadge = () => {
    switch (request.status) {
      case 'submitted':
        return (
          <div className="flex items-center status-badge-submitted">
            <Clock size={12} className="mr-1" />
            Submitted
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex items-center status-badge-in-progress">
            <AlertTriangle size={12} className="mr-1" />
            In Progress
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center status-badge-completed">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-medium mb-1 line-clamp-1">{request.description}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(request.createdAt), 'MMM d, yyyy')}
          </p>
        </div>
        <div>{getStatusBadge()}</div>
      </div>
      
      {request.photoUrl && (
        <div className="mt-2 mb-3">
          <img 
            src={request.photoUrl} 
            alt="Maintenance issue" 
            className="w-full h-32 object-cover rounded"
          />
        </div>
      )}
      
      {onViewDetails && (
        <Button 
          variant="ghost"
          size="sm"
          className="w-full mt-2"
          onClick={() => onViewDetails(request.id)}
        >
          View Details
        </Button>
      )}
    </div>
  );
};

export default MaintenanceRequestCard;
