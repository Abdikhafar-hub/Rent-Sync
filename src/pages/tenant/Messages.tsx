
import React, { useState } from 'react';
import TenantLayout from '@/components/layouts/TenantLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockAnnouncements } from '@/lib/mockData';
import { format } from 'date-fns';
import { toast } from 'sonner';
import AnnouncementCard from '@/components/cards/AnnouncementCard';
import { MessageSquare, Send } from 'lucide-react';

const Messages = () => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // In a real app, we would fetch announcements for this tenant from Supabase
  const announcements = mockAnnouncements;
  
  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    setIsSending(true);
    
    try {
      // In a real app, we would send this message to Supabase
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully');
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <TenantLayout title="Messages">
      <div className="space-y-6">
        {/* Send Message Card */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Property Management</CardTitle>
            <CardDescription>
              Send a message to the property management team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px]"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={isSending}
                className="flex items-center gap-2"
              >
                <Send size={16} />
                {isSending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>
              Important updates from property management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.length > 0 ? (
              announcements.map(announcement => (
                <AnnouncementCard 
                  key={announcement.id} 
                  announcement={announcement} 
                />
              ))
            ) : (
              <div className="text-center py-10">
                <MessageSquare className="mx-auto mb-3 text-gray-400" size={32} />
                <p className="text-gray-500">No announcements at this time</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
};

export default Messages;
