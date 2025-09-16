import { ReactNode } from "react";

export default function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 shadow-[0_-1px_0_rgba(255,255,255,0.05)] ${className}`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        {children}
      </div>
    </section>
  );
}
