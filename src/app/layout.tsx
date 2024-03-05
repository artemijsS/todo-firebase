import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import React from "react";
import AuthProvider from "@/contexts/SessionProvider";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ThemeSwitcher } from "@/components/sys";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TODO",
    description: "artemijss",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <AuthProvider session={session}>
                <body className={`${inter.className}`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ThemeSwitcher />
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </body>
            </AuthProvider>
        </html>
    );
}
