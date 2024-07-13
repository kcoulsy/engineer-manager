import { and, eq } from "drizzle-orm";
import { validateRequest } from "~/server/auth/validate";
import { db } from "~/server/db";
import { reportTable } from "~/server/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Catchups } from "../(tabs)/catchups";

export default async function UserPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { user } = await validateRequest();
  if (!user) {
    return <div>User not found</div>;
  }
  const [foundUser] = await db
    .select()
    .from(reportTable)
    .where(
      and(
        eq(reportTable.id, Number(params.id)),
        eq(reportTable.userId, user.id),
      ),
    );

  if (!foundUser) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1 className="p-1 text-2xl font-semibold">User: {foundUser.name}</h1>
      <Tabs defaultValue="account" className="mt-2 w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Overview</TabsTrigger>
          <TabsTrigger value="catchups">Catchups</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent className="p-1" value="account">
          Overview of the report
        </TabsContent>
        <TabsContent className="p-1" value="catchups">
          <Catchups report={foundUser} />
        </TabsContent>
        <TabsContent className="p-1" value="goals">
          Goal setting here
        </TabsContent>
        <TabsContent className="p-1" value="training">
          Training
        </TabsContent>
        <TabsContent className="p-1" value="performance">
          Performance
        </TabsContent>
      </Tabs>
    </div>
  );
}
