export default function EventDetailLoading() {
  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 py-6 sm:py-10 animate-pulse">
      {/* Top action bar: Back button + Status pills */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Back to Dashboard Button Skeleton */}
        <div className="h-9 w-40 rounded-lg border border-zinc-800 bg-zinc-900/80" />

        {/* Counter Pills Skeleton (Going, Maybe, Not Going) */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 rounded-lg border border-emerald-500/20 bg-emerald-500/10" />
          <div className="h-8 w-24 rounded-lg border border-amber-500/20 bg-amber-500/10" />
          <div className="h-8 w-28 rounded-lg border border-zinc-800 bg-zinc-900/60" />
        </div>
      </div>

      {/* Main Title & Meta Info Section */}
      <div className="space-y-4 border-b border-zinc-800/70 pb-8">
        {/* Title */}
        <div className="h-10 w-72 rounded-lg bg-zinc-800 sm:h-12 sm:w-96" />

        {/* Date and Location row */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-zinc-800" />
            <div className="h-4 w-60 rounded bg-zinc-800/80" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-zinc-800" />
            <div className="h-4 w-36 rounded bg-zinc-800/80" />
          </div>
        </div>

        {/* Description line */}
        <div className="pt-2">
          <div className="h-4 w-2/3 rounded bg-zinc-800/60 sm:w-1/2" />
        </div>
      </div>

      {/* Two-Column Content Grid: Invite Link (Left) & Guest Responses (Right) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Invite Link Card */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-xl lg:col-span-4">
          {/* Accent icon container */}
          <div className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-800/80" />

          {/* Heading & Subtitle */}
          <div className="mt-5 space-y-2">
            <div className="h-6 w-28 rounded-md bg-zinc-800" />
            <div className="space-y-1.5 pt-1">
              <div className="h-3.5 w-full rounded bg-zinc-800/50" />
              <div className="h-3.5 w-4/5 rounded bg-zinc-800/50" />
            </div>
          </div>

          {/* Readonly Link Input Box */}
          <div className="mt-6 h-10 w-full rounded-md border border-zinc-800 bg-zinc-950/70" />

          {/* Action Button Skeleton (Regenerate Link) */}
          <div className="mt-4 h-10 w-full rounded-md border border-zinc-800 bg-zinc-800/80" />
        </div>

        {/* Right Column: Guest Responses Card */}
        <div className="relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-xl lg:col-span-8">
          {/* Header with Title and Total Count */}
          <div className="flex items-center justify-between pb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-800/70" />
              <div className="h-6 w-44 rounded-md bg-zinc-800" />
            </div>
            <div className="h-4 w-28 rounded bg-zinc-800/60" />
          </div>

          {/* Empty / Inner State Border Box */}
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800/80 bg-zinc-950/30 p-8 text-center">
            {/* Center Icon */}
            <div className="h-10 w-10 rounded-lg bg-zinc-800/70" />
            {/* Main prompt */}
            <div className="mt-4 h-5 w-48 rounded bg-zinc-800" />
            {/* Sub text */}
            <div className="mt-2 h-3.5 w-72 rounded bg-zinc-800/50" />
          </div>
        </div>
      </div>
    </div>
  );
}