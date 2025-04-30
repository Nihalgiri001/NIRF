import React, { ReactNode } from "react";
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from "./dialog";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <DialogContent
        className="fixed inset-0 flex items-center justify-center z-50 bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DialogTitle className="sr-only">Modal Title</DialogTitle>
        <DialogDescription className="sr-only">Modal Description</DialogDescription>
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;