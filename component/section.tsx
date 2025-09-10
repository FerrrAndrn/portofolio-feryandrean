import { ReactNode } from "react";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: ReactNode;   // 🔥 dari string -> ReactNode
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="container mx-auto px-6 py-20 shadow-[0_-1px_0_rgba(255,255,255,0.05)]"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      {children}
    </section>
  );
}
