import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-yellow-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-600 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-yellow-50 border-yellow-300 text-yellow-950 shadow-yellow-200/50',
    error: 'bg-red-50 border-red-200 text-red-950 shadow-red-100',
    info: 'bg-amber-50 border-amber-200 text-amber-950 shadow-amber-100'
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-slow">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 shadow-xl backdrop-blur-md transition-all ${bgStyles[toastMessage.type] || bgStyles.success}`}>
        {icons[toastMessage.type] || icons.success}
        <p className="font-semibold text-sm tracking-wide">{toastMessage.message}</p>
      </div>
    </div>
  );
};
