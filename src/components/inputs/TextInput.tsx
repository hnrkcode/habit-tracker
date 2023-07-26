import { ChangeEvent } from "react";

type TextInputProps = {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({ id, value, onChange }: TextInputProps) {
  return (
    <input
      type="text"
      id={id}
      className="w-full border border-gray-300 rounded px-3 py-2"
      value={value}
      onChange={onChange}
    />
  );
}
