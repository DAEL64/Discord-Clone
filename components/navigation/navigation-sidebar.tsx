import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

import { Separator } from "../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ModeToggle } from "../mode-toggle";

import { UserButton } from "@clerk/nextjs";

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
    <div className="space-y-4 bg-[#f3f3f4] flex flex-col items-center h-full text-primary w-full dark:bg-[#121214] py-3">
      <NavigationAction />
      <Separator className="bg-[#d9d9dc] dark:bg-zinc-700 mx-auto w-10 rounded-lg" />
      <ScrollArea className="flex-1 w-full">
        {server.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-3">
        <ModeToggle />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: "44px",
                height: "44px",
              },
            },
          }}
          afterSignOutUrl="/"
        />
      </div>
    </div>
  );
};
