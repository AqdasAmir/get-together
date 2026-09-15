import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Sparkles, CalendarDays, PlusCircle } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { NeonAuthUIProvider, UserButton } from "@neondatabase/auth/react";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GetTogether | Plan events & track RSVPs in real time",
  description:
    "Effortlessly schedule events, distribute invite tokens, and manage guest attendance in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-[var(--background)] font-sans text-[var(--foreground)] selection:bg-violet-500/30 selection:text-violet-200">
        <NeonAuthUIProvider authClient={authClient as any} defaultTheme="dark">
          
          <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-[#0d0d12]/75 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
              
              <Link
                href="/"
                className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/25 transition-transform duration-200 group-hover:scale-105">
                  <Sparkles className="h-4.5 w-4.5 text-white" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-white">
                    GetTogether
                  </span>
                  <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold text-violet-400 ring-1 ring-violet-500/20">
                    Beta
                  </span>
                </div>
              </Link>

              
              <nav className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  <CalendarDays className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>

                <Button
                  size="sm"
                  className="hidden h-8.5 gap-1.5 rounded-lg bg-violet-600 px-3.5 text-xs font-semibold text-white shadow-sm hover:bg-violet-500 sm:inline-flex"
                  asChild
                >
                  <Link href="/events/new">
                    <PlusCircle className="h-3.5 w-3.5" />
                    New Event
                  </Link>
                </Button>

                
                <div className="ml-1 flex items-center pl-2 sm:border-l sm:border-zinc-800">
                  <UserButton size="icon" />
                </div>
              </nav>
            </div>
          </header>

          
          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
            {children}
          </main>

          
          <footer className="border-t border-zinc-900 bg-[#09090d]/60 py-6 text-xs text-zinc-500 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
              <p>© {new Date().getFullYear()} GetTogether. Built with Next.js 16, Prisma & Neon.</p>
              <div className="flex items-center gap-5 text-zinc-400">
                <Link href="/dashboard" className="transition-colors hover:text-zinc-200">
                  Dashboard
                </Link>
                <Link href="/events/new" className="transition-colors hover:text-zinc-200">
                  Create Event
                </Link>
              </div>
            </div>
          </footer>
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}