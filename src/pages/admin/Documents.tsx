
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUp, DownloadCloud, Trash2, Search, File } from 'lucide-react';
import { toast } from 'sonner';
import { Document } from '@/lib/types';
import { mockUsers } from '@/lib/mockData';

// Mock documents data
const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    adminId: 'admin-1',
    fileUrl: 'https://example.com/lease-agreement.pdf',
    name: 'Lease Agreement Template',
    createdAt: '2023-06-15T10:30:00Z',
  },
  {
    id: 'doc-2',
    adminId: 'admin-1',
    tenantId: 'tenant-1',
    fileUrl: 'https://example.com/tenant1-lease.pdf',
    name: 'John Doe Lease Agreement',
    createdAt: '2023-06-20T14:45:00Z',
  },
  {
    id: 'doc-3',
    adminId: 'admin-1',
    fileUrl: 'https://example.com/property-rules.pdf',
    name: 'Property Rules and Regulations',
    createdAt: '2023-07-05T09:15:00Z',
  },
  {
    id: 'doc-4',
    adminId: 'admin-1',
    tenantId: 'tenant-2',
    fileUrl: 'https://example.com/tenant2-lease.pdf',
    name: 'Jane Smith Lease Agreement',
    createdAt: '2023-07-10T16:20:00Z',
  }
];

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Filter the list of tenants from mockUsers
  const tenants = mockUsers.filter(user => user.role === 'tenant');
  
  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle document upload
  const handleUploadDocument = async () => {
    if (!newDocumentName) {
      toast.error('Please enter a document name');
      return;
    }
    
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real app, this would upload to Supabase Storage
      // and create a record in the documents table
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a new document object
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        adminId: 'admin-1', // Current admin ID
        tenantId: selectedTenant,
        fileUrl: URL.createObjectURL(selectedFile), // In real app, this would be Supabase URL
        name: newDocumentName,
        createdAt: new Date().toISOString(),
      };
      
      // Add to documents list (in real app, would be saved to Supabase)
      setDocuments([newDocument, ...documents]);
      
      toast.success('Document uploaded successfully');
      setIsUploadModalOpen(false);
      resetUploadForm();
    } catch (error) {
      toast.error('Failed to upload document');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  // Reset the upload form
  const resetUploadForm = () => {
    setNewDocumentName('');
    setSelectedTenant(undefined);
    setSelectedFile(null);
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Handle document deletion
  const handleDeleteDocument = async (documentId: string) => {
    // In a real app, this would delete from Supabase Storage
    // and remove the record from the documents table
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter out the deleted document
      setDocuments(documents.filter(doc => doc.id !== documentId));
      
      toast.success('Document deleted successfully');
    } catch (error) {
      toast.error('Failed to delete document');
      console.error('Delete error:', error);
    }
  };
  
  // Get tenant name for display
  const getTenantName = (tenantId?: string) => {
    if (!tenantId) return 'All Tenants';
    
    const tenant = tenants.find(t => t.id === tenantId);
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown Tenant';
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <AdminLayout title="Documents">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Document Management</h1>
            <p className="text-gray-500">
              Upload and manage documents for your property and tenants
            </p>
          </div>
          
          <Button 
            onClick={() => setIsUploadModalOpen(true)} 
            className="flex items-center gap-2"
          >
            <FileUp size={16} />
            Upload Document
          </Button>
        </div>
        
        {/* Search and Filters */}
        <Card className="overflow-hidden">
          <CardContent className="pt-6">
            <div className="mb-6 flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            {/* Documents Table */}
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Shared With</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium flex items-center">
                          <File size={16} className="mr-2 text-gray-500" />
                          {doc.name}
                        </TableCell>
                        <TableCell>{getTenantName(doc.tenantId)}</TableCell>
                        <TableCell>{formatDate(doc.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 p-1"
                              onClick={() => window.open(doc.fileUrl, '_blank')}
                              title="Download"
                            >
                              <DownloadCloud size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 p-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteDocument(doc.id)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        {searchQuery ? 'No documents found matching your search.' : 'No documents have been uploaded yet.'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upload Document Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Document</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input
                id="document-name"
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
                placeholder="e.g., Lease Agreement"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tenant">Share With (optional)</Label>
              <Select
                value={selectedTenant}
                onValueChange={setSelectedTenant}
              >
                <SelectTrigger id="tenant">
                  <SelectValue placeholder="All Tenants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undefined">All Tenants</SelectItem>
                  {tenants.map(tenant => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.firstName} {tenant.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Leave blank to share with all tenants
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">Document File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                {selectedFile ? `Selected: ${selectedFile.name}` : 'Supported formats: PDF, DOC, DOCX, JPG, PNG'}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsUploadModalOpen(false);
                resetUploadForm();
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUploadDocument}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Documents;
