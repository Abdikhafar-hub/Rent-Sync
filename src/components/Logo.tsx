import React from 'react';
import { Link } from 'react-router-dom';
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
    <Link to="/" className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2">
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
      <p className="text-xs text-gray-500 mt-1 ml-7 sm:ml-8">
        Powered by A.khafar Solutions
      </p>
    </Link>
  );
};

export default Logo;
