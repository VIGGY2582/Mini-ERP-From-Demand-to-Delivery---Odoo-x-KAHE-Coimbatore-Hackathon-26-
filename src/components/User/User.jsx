import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun, LogOut, Package, ShoppingBag, History, UserCheck, ShieldAlert, ArrowRight } from "lucide-react";

export default function User() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clears local storage state
        navigate("/login"); // Redirects back to the login page
    };

    // 🛑 AUTH GUARD: If there is no user session present, render the Unauthorized View
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                {/* Fixed Theme Toggle for consistency */}
                <button
                    onClick={toggleTheme}
                    className="fixed top-4 right-4 p-3 rounded-full shadow-md bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700 transition-all duration-300"
                >
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Unauthorized Warning Card */}
                <div className="w-full max-w-md p-6 text-center rounded-2xl shadow-xl border backdrop-blur-md bg-white/90 border-gray-200 dark:bg-gray-900/90 dark:border-gray-800 animate-shake">
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center shadow-inner">
                            <ShieldAlert size={28} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                        401 - Unauthorized Access
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-6 leading-relaxed">
                        Oops! You need to be logged in to access the user portal. Please sign in with your credentials to continue.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="group w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-md transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                        <span>Go to Login Screen</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        );
    }

    // 🔓 AUTHORIZED VIEW: Only loads if local storage/context user data exists
    return (
        <div className="min-h-screen transition-colors duration-500 bg-gradient-to-b from-slate-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b bg-white/80 border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            Mini ERP <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 ml-1 font-semibold">User Portal</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Theme Switcher */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded-xl transition-all duration-200"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Welcome Card Banner */}
                <div className="p-6 md:p-8 rounded-2xl border bg-white border-gray-200/80 dark:bg-gray-900 dark:border-gray-800 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                            <UserCheck size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                                Welcome, <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{user?.username || "Guest User"}</span>
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Access your workspace tools, track current orders, and manage inventory resources.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Workspaces Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* View Inventory */}
                    <div className="p-6 rounded-2xl border bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800/80 shadow-xs flex items-start gap-4 hover:border-blue-500/30 transition-colors duration-200">
                        <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 rounded-xl">
                            <Package size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">My Workspace</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">View allocated stock metrics and tracking items.</p>
                        </div>
                    </div>

                    {/* Purchase Request */}
                    <div className="p-6 rounded-2xl border bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800/80 shadow-xs flex items-start gap-4 hover:border-blue-500/30 transition-colors duration-200">
                        <div className="p-3 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 rounded-xl">
                            <ShoppingBag size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Purchase Orders</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Submit or inspect procurement tickets.</p>
                        </div>
                    </div>

                    {/* Performance History */}
                    <div className="p-6 rounded-2xl border bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800/80 shadow-xs flex items-start gap-4 hover:border-blue-500/30 transition-colors duration-200">
                        <div className="p-3 bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 rounded-xl">
                            <History size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Activity Logs</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Review processing steps and execution logs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}