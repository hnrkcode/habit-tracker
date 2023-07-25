import { ModalProps } from "../types/common";

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="absolute inset-0 bg-gray-800 opacity-75"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg p-8 z-10 max-h-[80vh] overflow-auto">
          {children}
        </div>
      </div>
    )
  );
}
