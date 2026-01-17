"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();


  return (
    <div>
      <ActionTooltip label="Add a server">
        <button
        onClick={() => onOpen("createServer")}
        className="group flex items-center">
          <div className="flex h-12 w-12 rounded-xl transition-all overflow-hidden items-center justify-center bg-neutral-200 dark:bg-neutral-900 dark:group-hover:bg-[#5764f0] cursor-pointer group-hover:bg-[#5764f0]">
            <Plus size={25} className="group-hover:text-white transition" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
