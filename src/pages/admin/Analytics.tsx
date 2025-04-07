
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { mockPayments, mockUnits } from '@/lib/mockData';
import { format, startOfMonth, subMonths, addDays } from 'date-fns';

const Analytics = () => {
  // Monthly revenue data (last 6 months)
  const getMonthlyRevenueData = () => {
    const currentDate = new Date();
    const monthlyData = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(currentDate, i));
      const monthName = format(monthStart, 'MMM');
      
      // Sum all successful payments within this month
      const monthlyRevenue = mockPayments
        .filter(payment => {
          if (!payment.paidAt) return false;
          const paymentDate = new Date(payment.paidAt);
          const paymentMonth = startOfMonth(paymentDate);
          return paymentMonth.getTime() === monthStart.getTime() && payment.status === 'completed';
        })
        .reduce((sum, payment) => sum + payment.amount, 0);
        
      monthlyData.push({
        month: monthName,
        revenue: monthlyRevenue
      });
    }
    
    return monthlyData;
  };
  
  // Occupancy data
  const getOccupancyData = () => {
    const occupied = mockUnits.filter(unit => unit.status === 'occupied').length;
    const vacant = mockUnits.filter(unit => unit.status === 'vacant').length;
    const maintenance = mockUnits.filter(unit => unit.status === 'maintenance').length;
    const total = mockUnits.length;
    
    return [
      { name: 'Occupied', value: occupied, percentage: Math.round((occupied / total) * 100) },
      { name: 'Vacant', value: vacant, percentage: Math.round((vacant / total) * 100) },
      { name: 'Maintenance', value: maintenance, percentage: Math.round((maintenance / total) * 100) }
    ];
  };
  
  // Payment timeliness data
  const getPaymentTimelinessData = () => {
    // Mock data for payment timeliness
    return [
      { name: 'On Time', value: 68 },
      { name: '1-3 Days Late', value: 22 },
      { name: '4-10 Days Late', value: 8 },
      { name: '10+ Days Late', value: 2 }
    ];
  };
  
  // Daily occupancy rate for the past 30 days
  const getOccupancyRateData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = addDays(today, -i);
      const formattedDate = format(date, 'MMM d');
      
      // Simulate some fluctuation in occupancy rate
      const baseRate = 85; // 85% base occupancy rate
      const randomVariation = Math.random() * 10 - 5; // -5% to +5%
      const rate = Math.min(100, Math.max(70, baseRate + randomVariation)); 
      
      data.push({
        date: formattedDate,
        rate: Math.round(rate)
      });
    }
    
    return data;
  };
  
  // Generate the data
  const monthlyRevenueData = getMonthlyRevenueData();
  const occupancyData = getOccupancyData();
  const paymentTimelinessData = getPaymentTimelinessData();
  const occupancyRateData = getOccupancyRateData();
  
  // Colors for charts
  const OCCUPANCY_COLORS = ['#22c55e', '#3b82f6', '#f59e0b'];
  const TIMELINESS_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Property Analytics Dashboard</h2>
        
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `KES ${value.toLocaleString()}`} 
                  />
                  <Tooltip 
                    formatter={(value) => [`KES ${value.toLocaleString()}`, 'Revenue']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Occupancy Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Unit Occupancy Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={occupancyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {occupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={OCCUPANCY_COLORS[index % OCCUPANCY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} units`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Timeliness */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Timeliness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentTimelinessData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {paymentTimelinessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={TIMELINESS_COLORS[index % TIMELINESS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Occupancy Rate Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>30-Day Occupancy Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={occupancyRateData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
