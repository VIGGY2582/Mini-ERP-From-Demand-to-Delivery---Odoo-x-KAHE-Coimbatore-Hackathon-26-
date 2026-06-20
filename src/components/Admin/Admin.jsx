import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
    Moon, Sun, LogOut, Shield, Users, LayoutDashboard,
    Settings, ShieldAlert, ArrowRight, Menu, X, Briefcase, ShoppingBag
} from "lucide-react";

// 🚀 IMPORT YOUR COMPONENT HERE
// Create a file named 'UserManagement.jsx' (or .js) in the same folder as this file
import UserManagement from "./UserManagement";

// Remaining static inline placeholders for other tabs
const CoreOverview = () => <div className="text-sm font-mono text-gray-500">System cluster state normal. All worker nodes reporting OK.</div>;
const CustomerManagement = () => <div className="text-sm font-mono text-gray-500">Customer profiles relational table data structure.</div>;
const VendorManagement = () => <div className="text-sm font-mono text-gray-500">Procurement procurement supply contracts ledger.</div>;
const GlobalSettings = () => <div className="text-sm font-mono text-gray-500">Adjust RLS settings and API token expiration frames.</div>;

export default function Admin() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    // Mobile View Drawer & Workspace Tracker States
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // 🛑 AUTH & ROLE GUARD
    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
                <button onClick={toggleTheme} className="fixed top-4 right-4 p-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 shadow-md">
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                <div className="w-full max-w-md p-6 text-center rounded-2xl shadow-xl border bg-white/90 border-gray-200 dark:bg-gray-900/90 dark:border-gray-800 animate-shake">
                    <ShieldAlert className="text-red-600 mx-auto mb-4" size={56} />
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">401 - Unauthorized Access</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-6">
                        {!user ? "Session missing. Please identify yourself." : "Insufficient privileges assigned to this operator handle."}
                    </p>
                    <button onClick={() => navigate("/login")} className="w-full py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-md">
                        <span>Return to Gateway</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        );
    }

    // Sidebar Items Configuration Array
    const navigationItems = [
        { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, component: CoreOverview },
        { id: "users", label: "User Management", icon: Users, component: UserManagement }, // Linked directly to your import above!
        { id: "customers", label: "Customer Relations", icon: Briefcase, component: CustomerManagement },
        { id: "vendors", label: "Vendor Procurement", icon: ShoppingBag, component: VendorManagement },
        { id: "settings", label: "System Settings", icon: Settings, component: GlobalSettings },
    ];

    // Identify which view needs to be rendered inside the viewport frame
    const ActiveWorkspaceView = navigationItems.find(item => item.id === activeTab)?.component || CoreOverview;

    return (
        <div className="min-h-screen flex bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 antialiased overflow-hidden transition-colors duration-500">

            {/* --- 🗂️ SIDEBAR LAYOUT PANEL --- */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 dark:bg-gray-900/40 border-r border-gray-200/80 dark:border-gray-900 transform lg:transform-none lg:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 ${
                mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0"
            }`}>
                <div className="space-y-6">
                    {/* Sidebar Brand Header */}
                    <div className="flex items-center gap-2.5 px-2 py-1">
                        <div className="w-8 h-8 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg flex items-center justify-center shadow-md">
                            <Shield size={16} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black tracking-wider uppercase text-gray-900 dark:text-white">Mini ERP</h2>
                            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block -mt-1">Admin Deck</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isSelected = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                                        isSelected
                                            ? "bg-gray-900 dark:bg-white text-white dark:text-gray-950 shadow-xs"
                                            : "text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900/60"
                                    }`}
                                >
                                    <Icon size={16} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Operator Profile Sign-off Footer */}
                <div className="border-t border-gray-200/60 dark:border-gray-900 pt-4 px-2 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                            {user?.username?.substring(0, 2).toUpperCase() || "AD"}
                        </div>
                        <div className="truncate">
                            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user?.username}</p>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Root Systems</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="w-full flex items-center gap-2 justify-center py-2 text-xs font-bold text-red-600 bg-red-500/5 hover:bg-red-500/10 dark:text-red-400 dark:bg-red-500/5 rounded-xl transition-colors"
                    >
                        <LogOut size={14} />
                        <span>Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Mobile layout darken overlay shield */}
            {mobileMenuOpen && (
                <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-xs z-30 lg:hidden" />
            )}

            {/* --- 🖥️ APP WORKSPACE VIEWPORT --- */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64">

                {/* Global Top Header Bar */}
                <header className="h-16 border-b border-gray-100 dark:border-gray-900 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 -ml-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 lg:hidden transition-colors"
                        >
                            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                        <div>
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Workspace</h3>
                            <h2 className="text-sm font-black tracking-tight text-gray-900 dark:text-white capitalize -mt-0.5">{activeTab} Panel</h2>
                        </div>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 hover:scale-105 transition-all"
                    >
                        {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                    </button>
                </header>

                {/* Main Dynamic Viewport Injector */}
                <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
                    <div className="p-6 md:p-8 rounded-2xl border bg-white border-gray-200/80 dark:bg-gray-900/40 dark:border-gray-900 shadow-xs">
                        <ActiveWorkspaceView />
                    </div>
                </main>
            </div>
        </div>
    );
}