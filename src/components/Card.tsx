import { CardProps } from "../types/common";

export default function Card({ children }: CardProps) {
  return (
    <div className="border-solid border-2 border-sky-500 m-2 p-2 rounded">
      {children}
    </div>
  );
}
