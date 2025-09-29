// layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { Header } from "../header/Header";
import AppSidebar from "../sidebar/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full flex">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
