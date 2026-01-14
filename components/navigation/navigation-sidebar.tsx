import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scroll } from "lucide-react";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="bg-zinc-300 dark:bg-zinc-700 mx-auto w-10 rounded-lg" />
      <ScrollArea className="flex-1 w-full">
        {server.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
