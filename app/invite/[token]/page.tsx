import { InviteAttendanceContent } from "@/components/invite-attendance-content";

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { token } = await params;
  const query = await searchParams;

  return (
    <InviteAttendanceContent token={token} submitted={query.submitted === "1"} />
  );
}