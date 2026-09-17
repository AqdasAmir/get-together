export default function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col gap-8 animate-pulse">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-zinc-800/80" />
          <div className="h-4 w-72 rounded-md bg-zinc-800/50" />
        </div>
        <div className="h-9 w-32 rounded-lg bg-zinc-800" />
      </div>

      
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-lg bg-zinc-800" />
              <div className="h-6 w-12 rounded-md bg-zinc-800/60" />
            </div>
            <div className="mt-4 h-5 w-3/4 rounded-md bg-zinc-800" />
            <div className="mt-2 h-3 w-1/2 rounded-md bg-zinc-800/60" />
            <div className="mt-6 flex gap-2">
              <div className="h-5 w-16 rounded-md bg-zinc-800/70" />
              <div className="h-5 w-16 rounded-md bg-zinc-800/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}