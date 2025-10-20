import React from 'react';

interface ErrorMessageProps {
  message?: string;
  id?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, id }) => {
  if (!message) return null;
  
  return (
    <p id={id} className="text-sm text-red-600 font-medium flex items-center gap-1 mt-1 animate-slide-down">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}</span>
    </p>
  );
};
