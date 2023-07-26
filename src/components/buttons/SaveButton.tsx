type SaveButtonProps = {
  onSave: () => void;
};

export default function SaveButton({ onSave }: SaveButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      onClick={onSave}
    >
      Save
    </button>
  );
}
