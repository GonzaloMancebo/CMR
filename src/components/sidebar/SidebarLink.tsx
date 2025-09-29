import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

interface SidebarLinkProps {
  url?: string;
  icon: React.ElementType;
  title: string;
  sidebarOpen: boolean;
  className?: string;
}

export function SidebarLink({ url, icon: Icon, title, sidebarOpen, className }: SidebarLinkProps) {
  return !sidebarOpen ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={url ?? "#"}
          className={`flex items-center justify-center w-full ${className || ""}`}
        >
          <Icon className="w-5 h-5" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  ) : (
    <Link
      to={url ?? "#"}
      className={`flex items-center gap-2 ${className || ""}`}
    >
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </Link>
  );
}
