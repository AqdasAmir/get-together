import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form, FormField } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitOrUpdateAttendanceAction } from "@/lib/actions/events";
import {
  CalendarDays,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Send,
} from "lucide-react";

export async function InviteAttendanceContent({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const e = row.event;
  const event = {
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
  };

  const submitAttendanceForToken = submitOrUpdateAttendanceAction.bind(
    null,
    token
  );

  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col items-center py-6 sm:py-10">
      <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

      <Card className="group relative w-full overflow-hidden border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl shadow-2xl transition-all">
        
        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-purple-500/5" />

        <CardHeader className="space-y-4 border-b border-zinc-800/70 pb-6">
          
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Event Attendance 
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
              <CalendarDays className="h-4.5 w-4.5" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
              {event.title}
            </CardTitle>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 sm:text-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-zinc-500" />
                <span>
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleString(undefined, {
                        dateStyle: "full",
                        timeStyle: "short",
                      })
                    : "Date to be announced"}
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
              <p className="pt-1 text-sm leading-relaxed text-zinc-400">
                {event.description}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {submitted && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-xs text-emerald-300 sm:text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-emerald-200">Attendance Submitted</p>
                <p className="text-emerald-300/90">
                  Thank you! Your response has been recorded. You can update it
                  anytime by submitting again.
                </p>
              </div>
            </div>
          )}

          <Form action={submitAttendanceForToken}>
            <FormField>
              <Label htmlFor="name" className="text-xs font-medium text-zinc-300">
                Your Full Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Peter Parker"
                className="h-10 border-zinc-800 bg-zinc-950/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-700 focus-visible:ring-zinc-700"
              />
            </FormField>

            <FormField>
              <Label htmlFor="email" className="text-xs font-medium text-zinc-300">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="h-10 border-zinc-800 bg-zinc-950/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-700 focus-visible:ring-zinc-700"
              />
            </FormField>

            <FormField>
              <Label htmlFor="status" className="text-xs font-medium text-zinc-300">
                Will you be attending?
              </Label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  required
                  defaultValue="going"
                  className="flex h-10 w-full appearance-none rounded-md border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700"
                >
                  <option value="going" className="bg-zinc-900 text-zinc-100">
                    Going
                  </option>
                  <option value="maybe" className="bg-zinc-900 text-zinc-100">
                    Maybe
                  </option>
                  <option value="not_going" className="bg-zinc-900 text-zinc-100">
                    Not going
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </FormField>

            <Button
              type="submit"
              className="mt-2 flex h-10 w-full items-center justify-center gap-2 border border-zinc-700 bg-zinc-800 font-medium text-zinc-100 shadow-sm transition-colors hover:bg-zinc-700 hover:text-white"
            >
              <Send className="h-4 w-4 text-zinc-400" />
              {submitted ? "Update Response" : "Confirm Attendance"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}