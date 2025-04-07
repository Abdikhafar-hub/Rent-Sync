import React from 'react';
import TenantLayout from '@/components/layouts/TenantLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, AlertTriangle, Building, Wrench, Lightbulb, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockPayments, mockMaintenanceRequests, mockAnnouncements, mockUnits } from '@/lib/mockData';
import PaymentCard from '@/components/cards/PaymentCard';
import MaintenanceRequestCard from '@/components/cards/MaintenanceRequestCard';
import AnnouncementCard from '@/components/cards/AnnouncementCard';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // For a real app, we would fetch this data from Supabase based on the logged-in user
  const pendingPayments = mockPayments.filter(p => p.status === 'pending');
  const activeMaintenanceRequests = mockMaintenanceRequests.filter(
    r => r.status === 'submitted' || r.status === 'in_progress'
  );
  const recentAnnouncements = mockAnnouncements.slice(0, 2);
  
  // Find tenant's unit
  const tenantUnit = mockUnits.find(unit => unit.tenantId === user?.id);

  return (
    <TenantLayout title="Dashboard">
      <div className="space-y-6">
        {/* Tenant Info Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Welcome, {user?.firstName}</h2>
                <p className="text-gray-500">
                  {tenantUnit ? (
                    <>
                      Unit {tenantUnit.unitNumber}, Rent: KES {tenantUnit.rentAmount.toLocaleString()}
                    </>
                  ) : (
                    'No unit assigned yet.'
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate(ROUTES.TENANT.PAYMENTS)}
                  className="flex items-center gap-2"
                >
                  <CreditCard size={18} />
                  Pay Rent
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate(ROUTES.TENANT.MAINTENANCE)}
                  className="flex items-center gap-2"
                >
                  <Wrench size={18} />
                  Report Issue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Alerts */}
        {pendingPayments.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md flex items-start">
            <AlertTriangle className="text-yellow-500 mr-3 mt-0.5" size={18} />
            <div>
              <p className="font-medium">Payment Due</p>
              <p className="text-yellow-700">
                You have {pendingPayments.length} pending payment{pendingPayments.length > 1 ? 's' : ''}.
                {' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-yellow-700 font-semibold underline"
                  onClick={() => navigate(ROUTES.TENANT.PAYMENTS)}
                >
                  Pay now
                </Button>
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Payments */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Pending Payments</CardTitle>
                <Button 
                  variant="ghost" 
                  className="text-sm"
                  onClick={() => navigate(ROUTES.TENANT.PAYMENTS)}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingPayments.length > 0 ? (
                  pendingPayments.slice(0, 2).map(payment => (
                    <PaymentCard
                      key={payment.id}
                      payment={payment}
                      onPayNow={() => navigate(ROUTES.TENANT.PAYMENTS)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No pending payments.</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.TENANT.PAYMENTS)}
                >
                  <CreditCard className="mr-2" size={18} />
                  Make a Payment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.TENANT.MAINTENANCE)}
                >
                  <Wrench className="mr-2" size={18} />
                  Submit Maintenance Request
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.TENANT.DOCUMENTS)}
                >
                  <Building className="mr-2" size={18} />
                  View Documents
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate(ROUTES.TENANT.MESSAGES)}
                >
                  <Bell className="mr-2" size={18} />
                  Contact Management
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Maintenance Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Maintenance Requests</CardTitle>
              <Button 
                variant="ghost" 
                className="text-sm"
                onClick={() => navigate(ROUTES.TENANT.MAINTENANCE)}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeMaintenanceRequests.length > 0 ? (
                activeMaintenanceRequests.slice(0, 3).map(request => (
                  <MaintenanceRequestCard key={request.id} request={request} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Lightbulb className="mx-auto mb-3 text-gray-400" size={32} />
                  <p className="text-gray-500">No active maintenance requests.</p>
                  <Button 
                    variant="link" 
                    onClick={() => navigate(ROUTES.TENANT.MAINTENANCE)}
                  >
                    Submit a new request
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Announcements */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Announcements</CardTitle>
              <Button variant="ghost" className="text-sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map(announcement => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))
              ) : (
                <p className="text-gray-500">No announcements at this time.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantLayout>
  );
};

export default Dashboard;
