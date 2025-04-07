
import React from 'react';
import TenantLayout from '@/components/layouts/TenantLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDocuments } from '@/lib/mockData';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Download, File, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Documents = () => {
  // In a real app, we would fetch documents for the logged-in tenant from Supabase
  const documents = mockDocuments;
  
  const handleDownload = (documentId: string, documentName: string) => {
    // In a real app, this would download the file from Supabase Storage
    alert(`Downloading ${documentName}`);
  };
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return <FileText className="text-red-500" size={24} />;
      case 'doc':
      case 'docx':
        return <FileText className="text-blue-500" size={24} />;
      case 'xls':
      case 'xlsx':
        return <FileText className="text-green-500" size={24} />;
      default:
        return <File className="text-gray-500" size={24} />;
    }
  };

  return (
    <TenantLayout title="Documents">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Your Documents</CardTitle>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search documents..." 
                  className="pl-8 w-full sm:w-[250px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-1 divide-y">
                {documents.map((document) => (
                  <div key={document.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(document.name)}
                      <div>
                        <p className="font-medium">{document.name}</p>
                        <p className="text-sm text-gray-500">
                          Added on {format(new Date(document.createdAt), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(document.id, document.name)}
                      className="flex items-center gap-1"
                    >
                      <Download size={16} />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                ))}
              </div>
              
              {documents.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="mx-auto mb-3 text-gray-400" size={32} />
                  <p className="text-gray-500">No documents available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
};

export default Documents;
