import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LanguageSwitcher from "@/component/LanguageSwitcher";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Fery Andrean — Portfolio",
  description: "Portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-[#f4f4f9] text-slate-800`}>
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
        {children}
      </body>
    </html>
  );
}
