"use client";

import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface ThemeSwitchProps {
  iconColor?: string;
}

export function ThemeSwitch({ iconColor = "currentColor" }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          {isDark ? (
            <Moon className="w-5 h-5" color={iconColor} />
          ) : (
            <Sun className="w-5 h-5" color={iconColor} />
          )}
          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </TooltipTrigger>
    </Tooltip>
  );
}
