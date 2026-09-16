import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "./dashboard-content";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form } from "./ui/form";
import { createInviteLinkAction } from "@/lib/actions/events";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  CalendarDays,
  MapPin,
  Clock,
  ArrowLeft,
  Share2,
  Users,
  Link2,
  CheckCircle2,
  HelpCircle,
  XCircle,
} from "lucide-react";

export async function EventDetailContent({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) {
  const row = await prisma.event.findFirst({
    where: { id: eventId, ownerUserId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      attendances: { select: { status: true } },
    },
  });

  if (!row) {
    notFound();
  }

  const counts = countByStatus(row.attendances);

  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate ? row.eventDate.toISOString() : null,
    inviteToken: row.invite?.token ?? null,
    goingCount: counts.goingCount,
    maybeCount: counts.maybeCount,
    notGoingCount: counts.notGoingCount,
  };

  const attendanceRows = await prisma.eventAttendance.findMany({
    where: { eventId },
    orderBy: { respondedAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      respondedAt: true,
    },
  });

  const attendances = attendanceRows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    status: r.status,
    respondedAt: r.respondedAt.toISOString(),
  }));

  const createInviteActionForEvent = createInviteLinkAction.bind(
    null,
    event.id
  );

  const inviteUrl = event.inviteToken
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invite/${event.inviteToken}`
    : null;

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 border-zinc-800 bg-zinc-900/80 text-xs text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <Link href="/dashboard">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 sm:text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-zinc-500" />
              <span>
                {event.eventDate
                  ? new Date(event.eventDate).toLocaleString(undefined, {
                      dateStyle: "full",
                      timeStyle: "short",
                    })
                  : "No date specified"}
              </span>
            </div>

            {event.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-zinc-500" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {event.description && (
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
              {event.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Going: {event.goingCount}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
            <HelpCircle className="h-3.5 w-3.5" />
            Maybe: {event.maybeCount}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-400">
            <XCircle className="h-3.5 w-3.5" />
            Not Going: {event.notGoingCount}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invite Link Card */}
        <Card className="group relative overflow-hidden border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl transition-all hover:border-zinc-700 hover:bg-zinc-900/60 lg:col-span-1">
          <div className="absolute top-0 right-0 h-28 w-28 rounded-bl-full bg-purple-500/5 transition-opacity group-hover:bg-purple-500/10" />
          <CardHeader className="space-y-2 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-400">
              <Share2 className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-zinc-100">
              Invite Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs leading-relaxed text-zinc-400">
              Share this link with attendees so they can Respond immediately without
              having to register or log in.
            </p>

            {inviteUrl ? (
              <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5 font-mono text-xs text-zinc-300">
                <Link2 className="h-4 w-4 shrink-0 text-zinc-500" />
                <span className="truncate selection:bg-purple-500/30 selection:text-purple-200">
                  {inviteUrl}
                </span>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-950/30 p-4 text-center text-xs text-zinc-500">
                No active invite link generated yet.
              </div>
            )}

            <Form action={createInviteActionForEvent}>
              <Button
                type="submit"
                className="w-full border border-zinc-700 bg-zinc-800 font-medium text-zinc-100 shadow-sm transition-colors hover:bg-zinc-700 hover:text-white"
              >
                {inviteUrl ? "Regenerate Link" : "Generate Invite Link"}
              </Button>
            </Form>
          </CardContent>
        </Card>

        {/* Attendees List Card */}
        <Card className="group relative overflow-hidden border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl transition-all hover:border-zinc-700 hover:bg-zinc-900/60 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
                <Users className="h-4.5 w-4.5" />
              </div>
              <CardTitle className="text-lg font-semibold text-zinc-100">
                Guest Responses
              </CardTitle>
            </div>
            <span className="text-xs text-zinc-500">
              {attendances.length} Total {attendances.length === 1 ? "Response" : "Responses"}
            </span>
          </CardHeader>
          <CardContent className="pt-2">
            {attendances.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800/80 py-10 text-center">
                <CalendarDays className="h-8 w-8 text-zinc-600" />
                <p className="mt-2 text-sm font-medium text-zinc-300">
                  No responses received yet
                </p>
                <p className="text-xs text-zinc-500">
                  Send your invite link to guests to start tracking Responses.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-zinc-800/80 bg-zinc-950/40">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800/80 hover:bg-transparent">
                      <TableHead className="text-xs text-zinc-400">Name</TableHead>
                      <TableHead className="text-xs text-zinc-400">Email</TableHead>
                      <TableHead className="text-xs text-zinc-400">Status</TableHead>
                      <TableHead className="text-right text-xs text-zinc-400">
                        Responded
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendances.map((attendance) => {
                      const isGoing = attendance.status === "going";
                      const isMaybe = attendance.status === "maybe";

                      return (
                        <TableRow
                          key={attendance.id}
                          className="border-zinc-800/60 transition-colors hover:bg-zinc-800/30"
                        >
                          <TableCell className="font-medium text-zinc-200">
                            {attendance.name}
                          </TableCell>
                          <TableCell className="text-xs text-zinc-400">
                            {attendance.email}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                                isGoing
                                  ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                  : isMaybe
                                  ? "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                                  : "border border-zinc-700 bg-zinc-800 text-zinc-400"
                              }`}
                            >
                              {attendance.status === "not_going"
                                ? "Not Going"
                                : attendance.status === "going"
                                ? "Going"
                                : "Maybe"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-xs text-zinc-500">
                            {new Date(attendance.respondedAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}