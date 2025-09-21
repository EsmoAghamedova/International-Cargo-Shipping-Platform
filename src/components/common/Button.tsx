import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 border-red-500',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
