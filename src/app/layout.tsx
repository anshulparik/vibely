import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import ClientNavbar from "@/components/Navbar/ClientNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibely",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
  params: { session, ...params },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <ClientNavbar />
          </div>
          <div className="bg-sky-100 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
