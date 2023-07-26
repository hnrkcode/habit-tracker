type DeleteButtonProps = {
  onDelete: () => void;
};

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      onClick={onDelete}
    >
      Delete
    </button>
  );
}
