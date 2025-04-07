import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  CreditCard, 
  Clock, 
  Wrench, 
  FileText,
  LogOut,
  DoorOpen,
  MessageSquare,
  Menu,
  Bell,
  User,
  ChevronDown,
} from 'lucide-react';
import Logo from '../Logo';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';

interface TenantLayoutProps {
  children: ReactNode;
  title: string;
}

const TenantLayout: React.FC<TenantLayoutProps> = ({ children, title }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: Home, path: ROUTES.TENANT.DASHBOARD },
    { name: 'Make Payment', icon: CreditCard, path: ROUTES.TENANT.PAYMENTS },
    { name: 'Payment History', icon: Clock, path: ROUTES.TENANT.PAYMENT_HISTORY },
    { name: 'Maintenance', icon: Wrench, path: ROUTES.TENANT.MAINTENANCE },
    { name: 'Documents', icon: FileText, path: ROUTES.TENANT.DOCUMENTS },
    { name: 'Move Out', icon: DoorOpen, path: ROUTES.TENANT.MOVE_OUT },
    { name: 'Messages', icon: MessageSquare, path: ROUTES.TENANT.MESSAGES },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation bar */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="block lg:hidden mr-4">
              <Button variant="outline" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0 bg-sidebar">
              <div className="p-4 flex justify-between items-center">
                <Logo className="text-white" />
              </div>
              <div className="mt-4 space-y-1 px-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </a>
                ))}
                <a
                  className="nav-link text-white hover:bg-white/20"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </a>
              </div>
            </SheetContent>
          </Sheet>
          <Logo className="hidden lg:flex" />
          <h1 className="text-xl font-semibold ml-4">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="hidden md:flex items-center">
                  {user?.firstName} {user?.lastName}
                  <ChevronDown size={16} className="ml-1" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content area with sidebar */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-sidebar">
          <div className="space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </a>
            ))}
            <a
              className="nav-link text-white hover:bg-white/20"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </a>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default TenantLayout;
