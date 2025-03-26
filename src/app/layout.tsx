import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
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
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
