'use client';

import React from 'react';

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  className = '',
  children = 'Login',
  onClick,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      id='login-button'
      className={`mx-auto ${className}`}
      onClick={onClick ?? (() => console.log('CLICK'))}>
      {children}
    </button>
  );
};

export default Button;
