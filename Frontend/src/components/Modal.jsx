import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative bg-card glass-panel animate-fade-in shadow-2xl border border-white/10 rounded-2xl">
                <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-card/95 backdrop-blur-xl z-10">
                    <h3 className="text-2xl font-bold text-white m-0">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-text-secondary hover:text-red-500 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
