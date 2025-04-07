
// User types and interfaces
export type UserRole = 'admin' | 'tenant';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
}

// Property types and interfaces
export interface Property {
  id: string;
  adminId: string;
  name: string;
  address: string;
  createdAt: string;
}

export type UnitStatus = 'occupied' | 'vacant' | 'maintenance';

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  rentAmount: number;
  status: UnitStatus;
  tenantId?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  createdAt: string;
}

// Payment types and interfaces
export type PaymentType = 'rent' | 'utility' | 'late_fee';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Payment {
  id: string;
  tenantId: string;
  unitId: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  transactionId?: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
  description?: string;
}

// Maintenance request types and interfaces
export type MaintenanceStatus = 'submitted' | 'in_progress' | 'completed';

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  unitId: string;
  description: string;
  photoUrl?: string;
  status: MaintenanceStatus;
  createdAt: string;
  updatedAt: string;
}

// Move-out request types and interfaces
export type MoveOutStatus = 'pending' | 'approved' | 'denied';

export interface MoveOutRequest {
  id: string;
  tenantId: string;
  unitId: string;
  moveOutDate: string;
  status: MoveOutStatus;
  createdAt: string;
  updatedAt: string;
}

// Message types and interfaces
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

// Announcement types and interfaces
export interface Announcement {
  id: string;
  adminId: string;
  propertyId?: string;
  content: string;
  createdAt: string;
  title: string;
}

// Document types and interfaces
export interface Document {
  id: string;
  adminId: string;
  tenantId?: string;
  fileUrl: string;
  name: string;
  createdAt: string;
}
