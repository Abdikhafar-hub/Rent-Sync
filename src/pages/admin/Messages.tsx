
import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, Message } from '@/lib/types';
import { mockUsers } from '@/lib/mockData';
import { format } from 'date-fns';
import { MessageSquare, Send, Search } from 'lucide-react';

// Mock messages data
const initialMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'admin-1',
    receiverId: 'tenant-1',
    content: 'Hello John, this is just a reminder that your rent is due tomorrow.',
    createdAt: '2023-08-10T09:15:00Z',
  },
  {
    id: 'msg-2',
    senderId: 'tenant-1',
    receiverId: 'admin-1',
    content: 'Thanks for the reminder. I will make the payment today.',
    createdAt: '2023-08-10T09:30:00Z',
  },
  {
    id: 'msg-3',
    senderId: 'tenant-2',
    receiverId: 'admin-1',
    content: 'Hello, I have a question about the utility bill this month.',
    createdAt: '2023-08-11T14:20:00Z',
  },
  {
    id: 'msg-4',
    senderId: 'admin-1',
    receiverId: 'tenant-2',
    content: 'Hi Jane, what would you like to know about your utility bill?',
    createdAt: '2023-08-11T14:40:00Z',
  },
  {
    id: 'msg-5',
    senderId: 'tenant-3',
    receiverId: 'admin-1',
    content: 'When will maintenance be coming to fix the bathroom sink?',
    createdAt: '2023-08-12T10:05:00Z',
  },
];

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [tenants, setTenants] = useState<User[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<User | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Filter tenants from mockUsers
  useEffect(() => {
    const filteredTenants = mockUsers.filter(user => user.role === 'tenant');
    setTenants(filteredTenants);
    
    // Select the first tenant by default
    if (filteredTenants.length > 0 && !selectedTenant) {
      setSelectedTenant(filteredTenants[0]);
    }
  }, []);
  
  // Scroll to bottom of messages when they change or tenant is selected
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedTenant]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Filter tenants by search query
  const filteredTenants = tenants.filter(tenant => {
    const fullName = `${tenant.firstName} ${tenant.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           tenant.email.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get conversation with selected tenant
  const getConversation = () => {
    if (!selectedTenant) return [];
    
    return messages.filter(msg => 
      (msg.senderId === 'admin-1' && msg.receiverId === selectedTenant.id) || 
      (msg.senderId === selectedTenant.id && msg.receiverId === 'admin-1')
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };
  
  // Send a new message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedTenant) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'admin-1', // Current admin ID
      receiverId: selectedTenant.id,
      content: messageInput.trim(),
      createdAt: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
    
    // In a real app, this would be sent to Supabase
    toast.success('Message sent');
  };
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, 'MMM d, h:mm a');
  };
  
  // Get user name by ID
  const getUserName = (userId: string) => {
    if (userId === 'admin-1') return 'You';
    
    const user = mockUsers.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };
  
  return (
    <AdminLayout title="Messages">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Message Center</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Tenants List */}
          <Card className="md:col-span-4">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search tenants..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-auto space-y-2">
              {filteredTenants.length > 0 ? (
                filteredTenants.map(tenant => (
                  <div 
                    key={tenant.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTenant?.id === tenant.id 
                      ? 'bg-rentalsync-primary text-white' 
                      : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {tenant.firstName?.[0]}{tenant.lastName?.[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${selectedTenant?.id === tenant.id ? 'text-white' : 'text-gray-900'}`}>
                        {tenant.firstName} {tenant.lastName}
                      </p>
                      <p className={`text-sm truncate ${selectedTenant?.id === tenant.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {tenant.email}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No tenants found
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Messages */}
          <Card className="md:col-span-8 flex flex-col">
            {selectedTenant ? (
              <>
                <CardHeader className="border-b pb-3 flex flex-row items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {selectedTenant.firstName?.[0]}{selectedTenant.lastName?.[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedTenant.firstName} {selectedTenant.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedTenant.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-0">
                  <div className="flex flex-col p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                    {getConversation().length > 0 ? (
                      getConversation().map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.senderId === 'admin-1' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] rounded-lg p-3 ${
                              message.senderId === 'admin-1' 
                                ? 'bg-rentalsync-primary text-white rounded-tr-none' 
                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className={`text-xs mt-1 ${message.senderId === 'admin-1' ? 'text-white/80' : 'text-gray-500'}`}>
                              {formatTimestamp(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                          <p className="text-gray-500">No messages yet</p>
                          <p className="text-sm text-gray-400">
                            Start the conversation with {selectedTenant.firstName}
                          </p>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={`Message ${selectedTenant.firstName}...`}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      size="icon"
                      disabled={!messageInput.trim()}
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full py-16">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-500">Select a tenant to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Messages;
