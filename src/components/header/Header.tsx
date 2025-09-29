"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ThemeSwitch } from "../theme/ThemeSwitch";

export function Header() {
  const { state: sidebarState } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const sidebarOpen = sidebarState === "expanded";

  return (
    <header
      className={cn(
        "fixed top-0 h-16 flex items-center justify-between px-4 border-b bg-gray-100 dark:bg-gray-800 z-50 w-full transition-all",
        sidebarOpen ? "md:ml-0" : "md:ml-0"
      )}
    >
      <SidebarTrigger />

      {/* Título central */}
      <div className="flex-1 flex items-center justify-center md:justify-start">
        <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Mi App
        </h1>
      </div>

      {/* Avatar + Theme Switch */}
      <div className="fixed top-0 right-0 h-16 flex items-center justify-end px-4 z-50">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
