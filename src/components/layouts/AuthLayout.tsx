
import React, { ReactNode } from 'react';
import Logo from '../Logo';
import { Building } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left side - Branding */}
      <div className="hidden sm:flex sm:w-1/2 bg-rentalsync-primary p-8 flex-col justify-center items-center text-white">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Building size={60} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">RentalSync</h1>
          <p className="text-xl mb-8">Streamlining property management for better living experiences.</p>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Building size={24} className="text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Easy Property Management</h3>
                <p className="text-sm text-white/80">Manage your properties with ease</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Building size={24} className="text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Simplified Payments</h3>
                <p className="text-sm text-white/80">Pay rent and bills with M-Pesa</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Building size={24} className="text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Streamlined Communication</h3>
                <p className="text-sm text-white/80">Easy communication between tenants and managers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="sm:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Logo size="large" />
            <h1 className="text-2xl font-bold mt-8 mb-2">{title}</h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
