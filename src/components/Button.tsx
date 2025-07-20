import React from 'react';
import type { IconType } from 'react-icons';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  fullWidth = false,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-300 hover:to-orange-400 shadow-lg hover:shadow-xl transform hover:-translate-y-1',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1',
    outline: 'bg-transparent border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-gray-900 shadow-lg hover:shadow-xl transform hover:-translate-y-1',
    ghost: 'bg-transparent text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="animate-spin rounded-full border-b-2 border-current mr-2" style={{ width: '1em', height: '1em' }}></div>
          Loading...
        </>
      );
    }

    if (Icon) {
      const iconElement = <Icon className={size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'} />;
      
      if (iconPosition === 'right') {
        return (
          <>
            {children}
            <span className="ml-2">{iconElement}</span>
          </>
        );
      } else {
        return (
          <>
            <span className="mr-2">{iconElement}</span>
            {children}
          </>
        );
      }
    }

    return children;
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {renderContent()}
    </button>
  );
};

export default Button; 