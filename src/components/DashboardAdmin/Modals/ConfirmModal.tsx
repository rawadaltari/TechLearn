import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  type = 'danger'
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return { icon: 'text-yellow-600 bg-yellow-100', button: 'bg-yellow-600 hover:bg-yellow-700' };
      case 'info':
        return { icon: 'text-blue-600 bg-blue-100', button: 'bg-blue-600 hover:bg-blue-700' };
      default:
        return { icon: 'text-red-600 bg-red-100', button: 'bg-red-600 hover:bg-red-700' };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-center flex-1">{title}</h2>
          <div className={`rounded-full p-2 ${styles.icon} flex items-center justify-center`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 text-center">
          <p>{message}</p>
        </div>

        <div className="flex justify-center gap-4 pb-6">
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`px-6 py-2 text-white rounded ${styles.button} transition-colors`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
