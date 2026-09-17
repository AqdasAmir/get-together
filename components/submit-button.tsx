"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="border border-zinc-700 bg-zinc-800 px-5 font-medium text-zinc-100 shadow-sm transition-colors hover:bg-zinc-700 hover:text-white"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Event...
        </>
      ) : (
        "Create Event"
      )}
    </Button>
  );
}