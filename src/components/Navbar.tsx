import { FaPlus } from "react-icons/fa";
import { NavbarProps } from "../types/common";

export default function Navbar({ onAddTask }: NavbarProps) {
  return (
    <div className="flex justify-end m-2">
      <FaPlus onClick={onAddTask} />
    </div>
  );
}
