import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    CreditCard,
    LayoutDashboard,
    LogOut,
    Megaphone,
    Users,
    Trophy,
    MapPin,
    Menu,
    Home,
    MessageSquare,
    Image as ImageIcon
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    useEffect(() => {
        if (!isAdmin) {
            navigate("/admin/login");
        }
    }, [isAdmin, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/admin/login");
    };

    if (!isAdmin) return null;

    const sidebarItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
        { icon: Trophy, label: "Matches", path: "/admin/matches" },
        { icon: Users, label: "Manage Teams", path: "/admin/teams" },
        { icon: MapPin, label: "Venues", path: "/admin/venues" },
        { icon: Megaphone, label: "Announcements", path: "/admin/announcements" },
        { icon: ImageIcon, label: "Gallery", path: "/admin/gallery" },
        { icon: Menu, label: "Quick Access", path: "/admin/quick-links" },
        { icon: MessageSquare, label: "Feedback", path: "/admin/feedback" },
    ];

    const NavItems = () => (
        <nav className="flex-1 p-4 space-y-2">
            <Link to="/">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-primary hover:bg-primary/5">
                    <Home className="h-5 w-5" />
                    Back to Website
                </Button>
            </Link>
            <div className="my-2 border-t border-gray-100" />
            {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                    <Link key={item.path} to={item.path}>
                        <Button
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start gap-3 ${isActive ? "" : "text-gray-600"}`}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </Button>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2 font-bold text-primary">
                    <CreditCard className="h-6 w-6" />
                    Admin Panel
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0 bg-white">
                        <div className="p-6 border-b">
                            <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                                <CreditCard className="h-6 w-6" />
                                Admin Panel
                            </h1>
                        </div>
                        <NavItems />
                        <div className="p-4 border-t">
                            <Button variant="destructive" className="w-full gap-2" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" /> Logout
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Sidebar - Desktop */}
            <aside className="w-64 bg-white border-r shadow-sm fixed h-full hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                        <CreditCard className="h-6 w-6" />
                        Admin Panel
                    </h1>
                </div>
                <NavItems />
                <div className="p-4 border-t">
                    <Button
                        variant="destructive"
                        className="w-full gap-2"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
            <Toaster />
        </div>
    );
}
