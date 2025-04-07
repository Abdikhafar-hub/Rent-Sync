import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Building, Check, CreditCard, Wrench } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/tenant');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white">
     <header className="border-b border-gray-100">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    <div>
      <Logo size="medium" />
      
    </div>
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => navigate('/login')}>
        Log In
      </Button>
      <Button onClick={() => navigate('/register')}>
        Get Started
      </Button>
    </div>
  </div>
</header>


      <section
        className="text-white py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/ddkkfumkl/image/upload/v1744050322/freepik__the-style-is-candid-image-photography-with-natural__75172_qrhbtr.png')",
        }}
      >
        <div className="bg-black/60 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Simplify Your Rental Management
              </h1>
              <p className="text-xl mb-8">
                RentalSync streamlines property management for both tenants and property managers. Pay rent, submit maintenance requests, and manage your properties with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-rentalsync-primary hover:bg-gray-100"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg"
                  className="bg-white text-rentalsync-primary hover:bg-gray-100"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need in One Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-blue-50 p-3 rounded-full inline-flex mb-4">
                <CreditCard className="text-rentalsync-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy M-Pesa Payments</h3>
              <p className="text-gray-600">
                Pay rent and bills directly through the platform using M-Pesa's secure payment system.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-1" />
                  <span className="text-gray-600">Instant payment confirmation</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-1" />
                  <span className="text-gray-600">Downloadable payment receipts</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-blue-50 p-3 rounded-full inline-flex mb-4">
                <Building className="text-rentalsync-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Property Management</h3>
              <p className="text-gray-600">
                Comprehensive tools for property managers to oversee multiple properties and units efficiently.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-1" />
                  <span className="text-gray-600">Track occupancy and tenant details</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-1" />
                  <span className="text-gray-600">Financial reporting and analytics</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-blue-50 p-3 rounded-full inline-flex mb-4">
                <Wrench className="text-rentalsync-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Maintenance Management</h3>
              <p className="text-gray-600">
                Submit and track maintenance requests with ease, complete with photo uploads and status updates.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-1" />
                  <span className="text-gray-600">Real-time status updates</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-green-500 mr-2 mt-1" />
                  <span className="text-gray-600">Photo attachment support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-rentalsync-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to streamline your rental experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of property managers and tenants who are already enjoying a simpler rental management process.
          </p>
          <Button 
            size="lg"
            className="bg-white text-rentalsync-primary hover:bg-gray-100"
            onClick={() => navigate('/register')}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <Logo size="medium" />
              <p className="mt-4 text-gray-600 max-w-xs">
                Streamlining property management for better living experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-rentalsync-primary">Features</a></li>
                  <li><a href="#" className="hover:text-rentalsync-primary">Pricing</a></li>
                  <li><a href="#" className="hover:text-rentalsync-primary">Testimonials</a></li>
                  <li><a href="#" className="hover:text-rentalsync-primary">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-rentalsync-primary">About</a></li>
                  <li><a href="#" className="hover:text-rentalsync-primary">Blog</a></li>
                  <li><a href="#" className="hover:text-rentalsync-primary">Careers</a></li>
                  <li><a href="#" className="hover:text-rentalsync-primary">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-rentalsync-primary">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-rentalsync-primary">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-rentalsync-primary">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} RentalSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
