import Link from "next/link";
import {
  CalendarDays,
  Share2,
  Users2,
  UsersRound,
  ArrowRight,
  CheckCircle2,
  PlusCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth/server";

export const dynamic = "force-dynamic";
export default async function Home() {
  const session = await getSession();
  const isAuthenticated = Boolean(session?.data?.user);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center py-10 md:py-16">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[320px] w-[540px] -translate-x-1/2 rounded-full bg-zinc-800/40 blur-[130px]" />

      {/* Hero Header */}
      <section className="flex max-w-3xl flex-col items-center space-y-6 text-center">
        <Badge
          variant="outline"
          className="border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-sm font-medium text-violet-300 backdrop-blur-md transition-colors hover:bg-violet-500/15"
        >
          <UsersRound className="mr-1.5 h-3.5 w-3.5 text-violet-400" />
          Plan • Share • Gather
        </Badge>

        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl md:text-7xl">
          Plan events & track <br />
          <span className="bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">
            responses in real-time
          </span>
        </h1>

        <p className="max-w-2xl text-base text-zinc-400 sm:text-lg">
          Create events in seconds, send unique invite links, and get
          live attendance update with instants Going, Maybe, and Not Going counts.
        </p>

        
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {isAuthenticated ? (
            <>
              <Button
                size="lg"
                className="h-11 border border-zinc-700 bg-zinc-800 px-6 font-medium text-zinc-100 shadow-sm transition-colors hover:bg-zinc-700 hover:text-white"
                asChild
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-zinc-800 bg-zinc-900/80 px-5 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                asChild
              >
                <Link href="/events/new" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Event
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                className="h-11 border border-zinc-700 bg-zinc-800 px-6 font-medium text-zinc-100 shadow-sm transition-colors hover:bg-zinc-700 hover:text-white"
                asChild
              >
                <Link href="/auth/sign-up" className="flex items-center gap-2">
                  Create account
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-zinc-800 bg-zinc-900/80 px-5 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                asChild
              >
                <Link href="/auth/sign-in">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="mt-16 grid w-full max-w-5xl gap-5 sm:grid-cols-2 md:grid-cols-3">
        {/* Card 1 */}
        <Card className="group relative overflow-hidden border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-zinc-900/70">
          <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-violet-500/5 transition-opacity group-hover:bg-violet-500/10" />
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400 group-hover:border-violet-500/40 group-hover:text-violet-300">
              <CalendarDays className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-zinc-100">
              Create events
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Set title, custom descriptions, dates, and locations in just a few clicks.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card 2 */}
        <Card className="group relative overflow-hidden border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-zinc-900/70">
          <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-indigo-500/5 transition-opacity group-hover:bg-indigo-500/10" />
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 group-hover:border-indigo-500/40 group-hover:text-indigo-300">
              <Share2 className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-zinc-100">
              Share invite links
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Generate unique link for guest's Responses. They don't have to Create Account or Login.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card 3 */}
        <Card className="group relative overflow-hidden border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-zinc-900/70">
          <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-purple-500/5 transition-opacity group-hover:bg-purple-500/10" />
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-400 group-hover:border-purple-500/40 group-hover:text-purple-300">
              <Users2 className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-zinc-100">
              Track attendance
            </CardTitle>
            <CardDescription className="text-zinc-400">
              See attendee statuses and response breakdowns at a glance.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-xs font-medium text-violet-300/80">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-violet-400" />
              Live attendee counts synced via Postgres
            </span>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}