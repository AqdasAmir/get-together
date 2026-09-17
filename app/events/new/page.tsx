import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import { createEventAction } from "@/lib/actions/events";
import Link from "next/link";
import {
  CalendarDays,
  Sparkles,
  MapPin,
  FileText,
  Clock,
  ArrowLeft,
} from "lucide-react";

export default async function NewEventPage() {
  return (
    <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center py-4 sm:py-8">
      
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

      
      <div className="mb-4 flex w-full justify-start">
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

      <Card className="group relative w-full overflow-hidden border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl shadow-2xl transition-all">
        
        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-purple-500/5 transition-opacity group-hover:bg-purple-500/10" />

        <CardHeader className="space-y-3 border-b border-zinc-800/70 pb-5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              New Gathering
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">
              <CalendarDays className="h-4.5 w-4.5" />
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
              Create Event
            </CardTitle>
            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
              Set your event details and generate an instant invite link for your guests.
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <Form action={createEventAction}>
            {/* Title Field */}
            <FormField>
              <Label htmlFor="title" className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                <CalendarDays className="h-3.5 w-3.5 text-zinc-500" />
                Event Title <span className="text-purple-400">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Team dinner, Birthday party, Launch hangout..."
                className="h-10 border-zinc-800 bg-zinc-950/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-700 focus-visible:ring-zinc-700"
              />
            </FormField>

            {/* Description Field */}
            <FormField>
              <Label htmlFor="description" className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                <FileText className="h-3.5 w-3.5 text-zinc-500" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide agenda, expectations, dress code, or bring-your-own details..."
                className="min-h-[100px] border-zinc-800 bg-zinc-950/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-700 focus-visible:ring-zinc-700"
              />
            </FormField>

            {/* Location Field */}
            <FormField>
              <Label htmlFor="location" className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="Physical address or Google Meet / Zoom link"
                className="h-10 border-zinc-800 bg-zinc-950/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-700 focus-visible:ring-zinc-700"
              />
            </FormField>

            {/* Date & Time Field */}
            <FormField>
              <Label htmlFor="eventDate" className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                <Clock className="h-3.5 w-3.5 text-zinc-500" />
                Date and Time
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                className="h-10 border-zinc-800 bg-zinc-950/70 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-zinc-700 focus-visible:ring-zinc-700 [color-scheme:dark]"
              />
              <FormMessage className="text-xs text-zinc-500">
                Optional — you can add or adjust this later from the event dashboard.
              </FormMessage>
            </FormField>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800/80">
              <Button
                type="button"
                variant="outline"
                className="border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                asChild
              >
                <Link href="/dashboard">Cancel</Link>
              </Button>

              <SubmitButton />
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}