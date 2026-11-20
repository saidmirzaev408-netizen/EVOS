import React from 'react';
import { useApp } from '../context/AppContext';

export const ToastContainer = () => {
  const { toasts } = useApp();
  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100 flex items-center p-4 rounded-xl shadow-2xl backdrop-blur-md text-white font-medium text-sm border ${
            toast.type === 'info' ? 'bg-gray-900/95 border-gray-700' : 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400/30'
          }`}
        >
          <span className="mr-3 text-lg">
            {toast.type === 'info' ? 'ℹ️' : '✨'}
          </span>
          <p className="flex-1">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

