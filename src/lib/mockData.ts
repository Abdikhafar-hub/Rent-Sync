
import {
  User,
  Property,
  Unit,
  Payment,
  MaintenanceRequest,
  MoveOutRequest,
  Announcement,
  Document,
} from './types';

// This file contains mock data for development purposes only.
// In the actual application, this data will be fetched from Supabase.

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    phoneNumber: '+254712345678',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    firstName: 'Admin',
    lastName: 'User',
  },
  {
    id: '2',
    email: 'tenant@example.com',
    role: 'tenant',
    phoneNumber: '+254723456789',
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    firstName: 'Tenant',
    lastName: 'User',
  },
];

export const mockProperties: Property[] = [
  {
    id: '1',
    adminId: '1',
    name: 'Sunset Apartments',
    address: '123 Main St, Nairobi',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    adminId: '1',
    name: 'Ocean View Residences',
    address: '456 Beach Rd, Mombasa',
    createdAt: '2023-01-02T00:00:00Z',
  },
];

export const mockUnits: Unit[] = [
  {
    id: '1',
    propertyId: '1',
    unitNumber: 'A101',
    rentAmount: 25000,
    status: 'occupied',
    tenantId: '2',
    leaseStartDate: '2023-01-01',
    leaseEndDate: '2023-12-31',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    propertyId: '1',
    unitNumber: 'A102',
    rentAmount: 28000,
    status: 'vacant',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '3',
    propertyId: '2',
    unitNumber: 'B201',
    rentAmount: 30000,
    status: 'occupied',
    tenantId: '2',
    leaseStartDate: '2023-02-01',
    leaseEndDate: '2023-12-31',
    createdAt: '2023-02-01T00:00:00Z',
  },
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    tenantId: '2',
    unitId: '1',
    amount: 25000,
    type: 'rent',
    status: 'completed',
    transactionId: 'MPesa12345',
    dueDate: '2023-04-01',
    paidAt: '2023-03-29T14:30:00Z',
    createdAt: '2023-03-29T14:30:00Z',
    description: 'April 2023 Rent',
  },
  {
    id: '2',
    tenantId: '2',
    unitId: '1',
    amount: 3500,
    type: 'utility',
    status: 'completed',
    transactionId: 'MPesa12346',
    dueDate: '2023-04-01',
    paidAt: '2023-03-30T10:15:00Z',
    createdAt: '2023-03-30T10:15:00Z',
    description: 'April 2023 Water Bill',
  },
  {
    id: '3',
    tenantId: '2',
    unitId: '1',
    amount: 25000,
    type: 'rent',
    status: 'pending',
    dueDate: '2023-05-01',
    createdAt: '2023-04-20T08:00:00Z',
    description: 'May 2023 Rent',
  },
  {
    id: '4',
    tenantId: '2',
    unitId: '1',
    amount: 4200,
    type: 'utility',
    status: 'pending',
    dueDate: '2023-05-01',
    createdAt: '2023-04-20T08:05:00Z',
    description: 'May 2023 Electricity Bill',
  },
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    tenantId: '2',
    unitId: '1',
    description: 'Leaky faucet in kitchen sink',
    status: 'completed',
    createdAt: '2023-03-15T09:30:00Z',
    updatedAt: '2023-03-17T14:20:00Z',
  },
  {
    id: '2',
    tenantId: '2',
    unitId: '1',
    description: 'Bathroom light not working',
    status: 'in_progress',
    createdAt: '2023-04-10T11:45:00Z',
    updatedAt: '2023-04-12T08:30:00Z',
  },
  {
    id: '3',
    tenantId: '2',
    unitId: '1',
    description: 'Air conditioner making strange noise',
    status: 'submitted',
    createdAt: '2023-04-20T15:20:00Z',
    updatedAt: '2023-04-20T15:20:00Z',
  },
];

export const mockMoveOutRequests: MoveOutRequest[] = [
  {
    id: '1',
    tenantId: '2',
    unitId: '1',
    moveOutDate: '2023-12-31',
    status: 'pending',
    createdAt: '2023-04-15T10:30:00Z',
    updatedAt: '2023-04-15T10:30:00Z',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    adminId: '1',
    propertyId: '1',
    title: 'Water Maintenance Notice',
    content: 'Water maintenance scheduled for April 10th from 9am to 1pm. Please store enough water.',
    createdAt: '2023-04-01T08:00:00Z',
  },
  {
    id: '2',
    adminId: '1',
    title: 'Security Update',
    content: 'New security measures implemented. All residents will receive new access cards next week.',
    createdAt: '2023-04-05T14:30:00Z',
  },
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    adminId: '1',
    tenantId: '2',
    fileUrl: '/documents/lease_agreement.pdf',
    name: 'Lease Agreement',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    adminId: '1',
    tenantId: '2',
    fileUrl: '/documents/building_rules.pdf',
    name: 'Building Rules and Regulations',
    createdAt: '2023-01-01T00:01:00Z',
  },
];
