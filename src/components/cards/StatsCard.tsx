
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  trend?: {
    value: string | number;
    positive: boolean;
  };
  children?: ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  className = '',
  iconClassName = '',
  trend,
  children,
}) => {
  return (
    <div className={cn('bg-white rounded-lg p-5 shadow-sm border border-gray-100', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h4 className="text-2xl font-bold">{value}</h4>
          {trend && (
            <div className={`flex items-center mt-1 text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '+' : '-'}{trend.value}
              <span className="ml-1">{trend.positive ? 'increase' : 'decrease'}</span>
            </div>
          )}
        </div>
        <div className={cn('p-2 rounded-full', iconClassName || 'bg-blue-50 text-blue-700')}>
          <Icon size={20} />
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default StatsCard;
