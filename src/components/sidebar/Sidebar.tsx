import { useContext } from "react";
import { Home, Inbox, Calendar, ShieldUser, Newspaper, Building, Flag } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { LoginContext } from "@/context/LoginContext";
import { SidebarLink } from "./SidebarLink";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/dashboard" },
  { title: "Incidentes / Reportes", icon: Inbox, url: "/incidentes" },
  { title: "Inspecciones", icon: Calendar, url: "/inspecciones" },
  { title: "EPP / Capacitaciones", icon: ShieldUser, url: "/epp-capacitacion" },
  { title: "Documentos y Normas", icon: Newspaper, url: "/documentos" },
  { title: "Mis Obras", icon: Building, url: "/obras" },
    { title: "Reportes", icon: Flag, url: "/reportes" },

];

export default function AppSidebar() {
  const { state: sidebarState } = useSidebar();
  const sidebarOpen = sidebarState === "expanded";
  const { role } = useContext(LoginContext);

  const rolePermissions: Record<string, string[]> = {
    Admi: menuItems.map((item) => item.title),
    Licenciado: [
      "Dashboard",
      "Incidentes / Reportes",
      "Inspecciones",
      "EPP / Capacitaciones",
      "Documentos y Normas",
    ],
    Ingeniero: ["Dashboard", "Mis Obras", "Reportes"],
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (!role) return false;
    return (rolePermissions[role.name] ?? []).includes(item.title);
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            {filteredMenuItems.map((item) => (
              <SidebarMenuItem key={item.title} className="mt-4">
                <SidebarMenuButton asChild>
                  <SidebarLink
                    url={item.url}
                    icon={item.icon}
                    title={item.title}
                    sidebarOpen={sidebarOpen}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
