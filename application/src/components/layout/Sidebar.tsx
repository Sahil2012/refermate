import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Send,
  User,
  Settings,
  LogOut,
  HelpCircle,
  ChevronsUpDown,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, useClerk, useUser } from "@clerk/clerk-react";
import { ROUTES } from "@/lib/consts/routesConsts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FullLogo from "../function/FullLogo";

export function Sidebar({ className }: { className?: string }) {
  const location = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: ROUTES.DASHBOARD.fullPath,
      active: location.pathname === ROUTES.DASHBOARD.fullPath,
    },
    {
      label: "Outreach",
      icon: Send,
      href: ROUTES.OUTREACH.TEMPLATES.fullPath,
      active: location.pathname.startsWith("/outreach"),
    },
    {
      label: "Drafts",
      icon: FileText,
      href: ROUTES.DRAFTS.fullPath,
      active: location.pathname === ROUTES.DRAFTS.fullPath,
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 pt-4 pb-6">
        <div className="px-3 py-2">
          <FullLogo to="/" size="sm" className="mb-7 ml-3" />
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 mb-1",
                  route.active && "bg-secondary font-medium",
                )}
                asChild
              >
                <Link to={route.href}>
                  <route.icon
                    className={cn(
                      "h-4 w-4 mr-2",
                      route.active
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 w-full px-4">
        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start h-14 px-2 hover:bg-muted/50 rounded-xl group"
              >
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="h-9 w-9 border border-border/40">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName || "User"}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {user?.firstName?.charAt(0) ||
                        user?.emailAddresses[0]?.emailAddress?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left flex-1 min-w-0">
                    <span className="text-sm font-medium truncate w-full">
                      {user?.fullName || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full">
                      {user?.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="center"
              className="w-56 rounded-xl p-2 mb-2"
            >
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link to={ROUTES.PROFILE.fullPath}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                <Link to={ROUTES.SETTINGS.fullPath}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </div>
    </div>
  );
}
