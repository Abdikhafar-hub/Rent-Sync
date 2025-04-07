import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { mockPayments, mockProperties, mockUnits, mockMaintenanceRequests } from '@/lib/mockData';
import StatsCard from '@/components/cards/StatsCard';
import PropertyCard from '@/components/cards/PropertyCard';
import PaymentCard from '@/components/cards/PaymentCard';
import MaintenanceRequestCard from '@/components/cards/MaintenanceRequestCard';
import { Building, CreditCard, Home, Plus, Wrench, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // For a real app, we would fetch this data from Supabase
  const totalProperties = mockProperties.length;
  const totalUnits = mockUnits.length;
  const occupiedUnits = mockUnits.filter(unit => unit.status === 'occupied').length;
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  
  const pendingPayments = mockPayments.filter(p => p.status === 'pending');
  const totalPendingAmount = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  const activeMaintenanceRequests = mockMaintenanceRequests.filter(
    r => r.status === 'submitted' || r.status === 'in_progress'
  );

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Properties"
            value={totalProperties}
            icon={Building}
            iconClassName="bg-blue-50 text-rentalsync-primary"
          />
          <StatsCard
            title="Total Units"
            value={totalUnits}
            icon={Home}
            iconClassName="bg-green-50 text-green-600"
          />
          <StatsCard
            title="Occupancy Rate"
            value={`${occupancyRate}%`}
            icon={Users}
            iconClassName="bg-purple-50 text-purple-600"
            trend={{
              value: '2%',
              positive: true,
            }}
          />
          <StatsCard
            title="Pending Payments"
            value={`KES ${totalPendingAmount.toLocaleString()}`}
            icon={CreditCard}
            iconClassName="bg-amber-50 text-amber-600"
          />
        </div>
        
        {/* Properties Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Properties Overview</CardTitle>
            <Button 
              onClick={() => navigate(ROUTES.ADMIN.PROPERTIES)}
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              Add Property
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProperties.map(property => {
                // Calculate unit and tenant count for this property
                const propertyUnits = mockUnits.filter(unit => unit.propertyId === property.id);
                const tenantCount = propertyUnits.filter(unit => unit.tenantId).length;
                
                return (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    unitCount={propertyUnits.length}
                    tenantCount={tenantCount}
                    onViewDetails={(id) => navigate(`${ROUTES.ADMIN.PROPERTIES}/${id}`)}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Payments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Pending Payments</CardTitle>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => navigate(ROUTES.ADMIN.PAYMENTS)}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingPayments.slice(0, 3).map(payment => (
                <PaymentCard
                  key={payment.id}
                  payment={payment}
                  hideButton
                />
              ))}
            </CardContent>
          </Card>
          
          {/* Maintenance Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Maintenance Requests</CardTitle>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => navigate(ROUTES.ADMIN.MAINTENANCE)}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeMaintenanceRequests.slice(0, 3).map(request => (
                <MaintenanceRequestCard
                  key={request.id}
                  request={request}
                  onViewDetails={(id) => navigate(`${ROUTES.ADMIN.MAINTENANCE}/${id}`)}
                />
              ))}
              
              {activeMaintenanceRequests.length === 0 && (
                <div className="text-center py-6">
                  <Wrench className="mx-auto mb-3 text-gray-400" size={32} />
                  <p className="text-gray-500">No active maintenance requests.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
