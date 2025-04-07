
import React from 'react';
import { Building } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true,
  className = ''
}) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };
  
  const iconSizes = {
    small: 16,
    medium: 24,
    large: 36
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Building 
        size={iconSizes[size]} 
        className="text-rentalsync-primary"
        strokeWidth={2.5}
      />
      {showText && (
        <span className={`font-bold ${sizeClasses[size]}`}>
          <span className="text-rentalsync-primary">Rental</span>
          <span className="text-black">Sync</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
