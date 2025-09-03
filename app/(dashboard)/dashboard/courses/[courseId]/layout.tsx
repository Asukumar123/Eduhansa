import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SanityLive } from "@/sanity/lib/live";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "Dashboard - EduHansa",
  description: "Student dashboard for course management",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthGuard>
        <SidebarProvider>
          <div className="h-full">{children}</div>
        </SidebarProvider>
      </AuthGuard>
      <SanityLive />
    </ThemeProvider>
  );
}