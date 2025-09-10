"use client";
import { ReactNode, HTMLAttributes } from "react";

// ✅ Card bisa nerima semua atribut <div> (onClick, id, style, dll.)
type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      {...props} // ✅ biar bisa pakai onClick langsung
      className={`bg-white rounded-lg shadow-md p-6 hover:scale-[1.02] transition transform ${className}`}
    >
      {children}
    </div>
  );
}
