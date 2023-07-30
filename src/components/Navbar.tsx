import { FaPlus, FaSignOutAlt } from "react-icons/fa";

import { supabaseClient } from "../supabase-client";
import { NavbarProps } from "../types/common";

export default function Navbar({ onAddTask }: NavbarProps) {
  return (
    <div className="flex justify-end m-2 gap-x-2">
      <FaPlus onClick={onAddTask} />
      <FaSignOutAlt onClick={() => supabaseClient.auth.signOut()} />
    </div>
  );
}
