import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import {useTheme} from "../context/ThemeContext";
import {
    Moon,
    Sun,
    Package,
    TrendingUp,
    ShoppingCart,
    Factory,
    ArrowRight,
    Zap,
    X,
    User,
    Lock,
    UserPlus,
    AlertCircle
} from "lucide-react";

export default function Home() {
    const navigate = useNavigate();
    const {user, login} = useAuth();
    const {theme, toggleTheme} = useTheme();

    // Context & Redirection Guard Layer
    useEffect(() => {
        if (user) {
            if (user.role === "admin") navigate("/admin", {replace: true});
            else navigate("/user", {replace: true});
        }
    }, [user, navigate]);

    // Embedded Signup State Machine
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [signupUser, setSignupUser] = useState("");
    const [signupPass, setSignupPass] = useState("");
    const [signupError, setSignupError] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);

    const handleEmbeddedSignup = async (e) => {
        e.preventDefault();

        // Quick Frontend Validations
        if (!signupUser || !signupPass) {
            setSignupError("Please fill in all fields.");
            return;
        }
        if (signupUser.length < 3) {
            setSignupError("Username must be at least 3 characters.");
            return;
        }
        if (signupPass.length < 8) {
            setSignupError("Password must be at least 8 characters long.");
            return;
        }

        setSignupLoading(true);
        setSignupError("");

        try {
            const response = await axios.post("http://localhost:5000/signup", {
                username: signupUser,
                password: signupPass
            });

            if (response.data.success) {
                // Auto-login the user directly after a successful signup cycle
                const authData = response.data.user;
                login(authData);
                localStorage.setItem("user", JSON.stringify(authData));
                navigate("/user");
            }
        } catch (err) {
            setSignupError(err.response?.data?.message || "An error occurred during account creation.");
        } finally {
            setSignupLoading(false);
        }
    };

    const features = [
        {icon: Package, label: "Inventory Management", description: "Track and manage your stock levels in real-time"},
        {icon: TrendingUp, label: "Sales Analytics", description: "Monitor sales performance and revenue metrics"},
        {icon: ShoppingCart, label: "Purchase Orders", description: "Streamline procurement and vendor management"},
        {icon: Factory, label: "Manufacturing", description: "Optimize production planning and execution"},
    ];

    const stats = [
        {number: "10K+", label: "Active Users"},
        {number: "500+", label: "Companies"},
        {number: "98%", label: "Satisfaction"},
        {number: "24/7", label: "Support"},
    ];

    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-950">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen transition-colors duration-500 bg-gradient-to-b from-slate-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Navbar */}
            <nav
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b bg-white/80 border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Mini ERP</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowSignupModal(true)}
                            className="hidden sm:inline-block text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Create Account
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-yellow-400 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            {theme === "light" ? <Moon size={20}/> : <Sun size={20}/>}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content Container */}
            <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <Zap className="text-blue-500" size={16}/>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Next Generation ERP Solution</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6">
                        Smart Business
                        <span
                            className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Management Platform
                        </span>
                    </h1>

                    <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
                        Complete solution for inventory, sales, purchase, and manufacturing management. Streamline your
                        operations with our powerful ERP system.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/login")}
                            className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Get Started Free
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                        </button>
                        <button
                            onClick={() => setShowSignupModal(true)}
                            className="px-8 py-3.5 rounded-xl font-semibold border-2 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200"
                        >
                            Sign Up Now
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index}
                             className="text-center p-6 rounded-xl border bg-white/60 border-gray-200/60 dark:bg-gray-900/40 dark:border-gray-800 backdrop-blur-sm">
                            <div
                                className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index}
                             className="group p-6 rounded-2xl border bg-white border-gray-100 hover:shadow-xl dark:bg-gray-900 dark:border-gray-800/80 transition-all duration-300">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                <feature.icon size={22}/>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.label}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div
                    className="mt-20 p-8 md:p-12 rounded-2xl text-center border bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100 dark:from-gray-900/40 dark:to-purple-900/20 dark:border-gray-800">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">Ready to Transform
                        Your Business?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Join thousands of companies already using Mini
                        ERP</p>
                    <button
                        onClick={() => setShowSignupModal(true)}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-transform active:scale-[0.98]"
                    >
                        Start Free Trial
                    </button>
                </div>
            </div>

            {/* 🆕 Embedded Sidebar Signup Overlay Modal */}
            {showSignupModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-300">
                    <div
                        className="w-full max-w-md h-full bg-white dark:bg-gray-900 p-6 shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col justify-between animate-fade-in animate-slide-left">

                        <div>
                            <div
                                className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <UserPlus className="text-blue-500" size={22}/>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Account</h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowSignupModal(false);
                                        setSignupError("");
                                    }}
                                    className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <X size={20}/>
                                </button>
                            </div>

                            <form onSubmit={handleEmbeddedSignup} className="mt-6 space-y-4">
                                {signupError && (
                                    <div
                                        className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2 text-sm">
                                        <AlertCircle size={16} className="flex-shrink-0"/>
                                        <span>{signupError}</span>
                                    </div>
                                )}

                                <div>
                                    <label
                                        className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">Username</label>
                                    <div
                                        className="flex items-center rounded-xl border-2 bg-gray-50 border-gray-200 focus-within:border-blue-500 focus-within:bg-white dark:bg-gray-800/50 dark:border-gray-700 dark:focus-within:border-blue-500 transition-all duration-200">
                                        <User className="ml-3 text-gray-400" size={18}/>
                                        <input
                                            type="text"
                                            placeholder="Min 3 characters"
                                            value={signupUser}
                                            onChange={(e) => setSignupUser(e.target.value)}
                                            className="w-full p-3 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">Password</label>
                                    <div
                                        className="flex items-center rounded-xl border-2 bg-gray-50 border-gray-200 focus-within:border-blue-500 focus-within:bg-white dark:bg-gray-800/50 dark:border-gray-700 dark:focus-within:border-blue-500 transition-all duration-200">
                                        <Lock className="ml-3 text-gray-400" size={18}/>
                                        <input
                                            type="password"
                                            placeholder="Min 8 characters"
                                            value={signupPass}
                                            onChange={(e) => setSignupPass(e.target.value)}
                                            className="w-full p-3 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={signupLoading}
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 mt-2"
                                >
                                    {signupLoading ? (
                                        <div
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <><span>Register & Continue</span><ArrowRight size={16}/></>
                                    )}
                                </button>
                            </form>
                        </div>

                        <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                            By joining, you will have access to the Mini ERP Standard User Portal.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}