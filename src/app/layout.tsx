import { Inter } from "next/font/google"
import { cn } from "../../lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Onash",
  description: "Showcasing my projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-slate-900 font-sans antialiased", inter.className)}>
        {children}
      </body>
    </html>
  );
}
