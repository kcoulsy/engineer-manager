import { redirect } from "next/navigation";
import { validateRequest } from "~/server/auth/validate";
import { routes } from "../../constants/routes";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect(routes.login);
  }
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Overview</TabsTrigger>
        <TabsTrigger value="catchups">Catchups</TabsTrigger>
        <TabsTrigger value="goals">Goals</TabsTrigger>
        <TabsTrigger value="training">Training</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Overview of the report</TabsContent>
      <TabsContent value="catchups">Catchup notes here</TabsContent>
      <TabsContent value="goals">Goal setting here</TabsContent>
      <TabsContent value="training">Training</TabsContent>
      <TabsContent value="performance">Performance</TabsContent>
    </Tabs>
  );
}
