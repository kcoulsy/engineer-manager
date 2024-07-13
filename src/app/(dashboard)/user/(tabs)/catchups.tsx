import type { Report } from "~/server/db/schema";
import { AddCatchupButton } from "./_components/add-catchup";

interface CatchupsProps {
  report: Report;
}

export async function Catchups({ report }: CatchupsProps) {
  return (
    <div>
      <AddCatchupButton />
    </div>
  );
}
