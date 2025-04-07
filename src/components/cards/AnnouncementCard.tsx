
import React from 'react';
import { Announcement } from '@/lib/types';
import { format } from 'date-fns';
import { Megaphone } from 'lucide-react';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-start mb-3">
        <div className="mr-3 bg-blue-50 p-2 rounded-full">
          <Megaphone size={20} className="text-rentalsync-primary" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold">{announcement.title}</h3>
            <p className="text-xs text-gray-500">
              {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
          <p className="text-sm mt-2">{announcement.content}</p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
