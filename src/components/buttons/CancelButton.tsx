type CancelButtonProps = {
  onCancel: () => void;
};

export default function CancelButton({ onCancel }: CancelButtonProps) {
  return (
    <button
      className="text-gray-900 bg-white border-2 border-gray-300 focus:outline-none hover:bg-gray-100 rounded px-4 py-2"
      onClick={onCancel}
    >
      Cancel
    </button>
  );
}
