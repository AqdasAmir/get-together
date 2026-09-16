import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Clock,
  PlusCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { AttendanceStatus as PrismaAttendanceStatus } from "@/app/generated/prisma/enums";

export function countByStatus(attendances: { status: PrismaAttendanceStatus }[]) {
  let goingCount = 0;
  let maybeCount = 0;
  let notGoingCount = 0;

  for (const r of attendances) {
    if (r.status === "going") goingCount += 1;
    else if (r.status === "maybe") maybeCount += 1;
    else if (r.status === "not_going") notGoingCount += 1;
  }

  return { goingCount, maybeCount, notGoingCount };
}

export async function DashboardContent({ userId }: { userId: string }) {
  const rows = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      attendances: { select: { status: true } },
    },
  });

  const events = rows.map((e) => ({
    id: e.id,
    title: e.title,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    location: e.location,
    ...countByStatus(e.attendances),
  }));

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Your Events
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Track attendee responses and manage event invite links.
          </p>
        </div>

        <Button
          className="border border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-white"
          asChild
        >
          <Link href="/events/new" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create event
          </Link>
        </Button>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <Card className="relative overflow-hidden border-dashed border-zinc-800 bg-zinc-900/30 py-12 text-center backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-zinc-200">
                No events created yet
              </h3>
              <p className="text-sm text-zinc-500">
                Create your first event to start collecting live Attendances.
              </p>
            </div>
            <Button
              className="border border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-white"
              asChild
            >
              <Link href="/events/new">Create your first event</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group relative flex flex-col justify-between overflow-hidden border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              {/* Corner ambient glow accent */}
              <div className="absolute top-0 right-0 h-28 w-28 rounded-bl-full bg-purple-500/5 transition-opacity group-hover:bg-purple-500/10" />

              <CardHeader className="space-y-4 pb-4">
                {/* Header row: Icon & Open Link */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-400 group-hover:border-purple-500/40 group-hover:text-purple-300">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1 px-2.5 text-xs text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100 z-50"
                    asChild
                  >
                    <Link href={`/events/${event.id}`}>
                      View
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>

                {/* Event Title */}
                <div>
                  <CardTitle className="line-clamp-1 text-lg font-semibold text-zinc-100 group-hover:text-white">
                    {event.title}
                  </CardTitle>

                  {/* Metadata (Date & Location) */}
                  <div className="mt-2 space-y-1.5 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-zinc-500" />
                      <span>
                        {event.eventDate
                          ? new Date(event.eventDate).toLocaleString(undefined, {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "No date set"}
                      </span>
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap items-center gap-2 border-t border-zinc-800/80 pt-3.5 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">
                    Going: {event.goingCount}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-medium text-amber-400">
                    Maybe: {event.maybeCount}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-medium text-zinc-400">
                    Not going: {event.notGoingCount}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}