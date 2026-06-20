import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, User, Lock, ArrowLeft, Shield, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [authMode, setAuthMode] = useState("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleAuthAction = async (e) => {
        if (e) e.preventDefault();
        if (!username || !password) {
            setError("All credentials must be filled out.");
            return;
        }

        if (authMode === "signup") {
            if (username.length < 3) {
                setError("Username demands at least 3 characters.");
                return;
            }
            if (password.length < 8) {
                setError("Security standard requires an 8-character minimum password.");
                return;
            }
        }

        setIsLoading(true);
        setError("");
        setSuccessMsg("");

        try {
            if (authMode === "login") {
                const response = await axios.post("http://localhost:5000/login", { username, password });
                const userData = response.data;
                login(userData);
                localStorage.setItem("user", JSON.stringify(userData));

                if (userData.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/user");
                }
            } else {
                const response = await axios.post("http://localhost:5000/signup", { username, password });
                if (response.data.success) {
                    setSuccessMsg("Account provisioned successfully. Transitioning...");
                    setUsername("");
                    setPassword("");
                    setTimeout(() => {
                        setAuthMode("login");
                        setSuccessMsg("");
                    }, 2000);
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || "Authentication layer handshake failed.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative bg-slate-50 dark:bg-gray-950 font-sans antialiased overflow-hidden selection:bg-blue-500/30 transition-colors duration-500">

            {/* --- 🌌 LAYER 1: FOUR CORNER GLOW ORBS --- */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] pointer-events-none" />

            {/* Micro grid mesh overlay for texture */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Theme Toggle Controller */}
            <button
                onClick={toggleTheme}
                className="fixed top-6 right-6 p-3 rounded-xl border bg-white/80 border-gray-200/80 dark:bg-gray-900/50 dark:border-gray-800 text-gray-500 dark:text-gray-400 backdrop-blur-md hover:scale-105 active:scale-95 transition-all z-50 shadow-xs"
            >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* --- 📦 LAYER 2: THE GLOWING CENTERPIECE WORKSPACE --- */}
            <div className="w-full max-w-md relative group">

                {/* 🌟 Central Box Ambient Glow Aura (Shadow Layer) */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 opacity-20 dark:opacity-30 blur-xl group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                {/* Back to Engine Trigger */}
                <button
                    onClick={() => navigate("/")}
                    className="group flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4 ml-1"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Terminal Home</span>
                </button>

                {/* Main Interactive Card Frame */}
                <div className="w-full relative rounded-2xl border bg-white/95 border-gray-200 dark:bg-gray-900/90 dark:border-gray-800/80 shadow-2xl backdrop-blur-xl overflow-hidden p-6 sm:p-8">

                    {/* Segment Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-12 h-12 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl flex items-center justify-center shadow-lg mb-4">
                            <Shield size={22} />
                        </div>
                        <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                            {authMode === "login" ? "Gateway Authentication" : "Provision New Identity"}
                        </h1>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {authMode === "login" ? "Enter your core credentials to decrypt session" : "Register a default enterprise application space"}
                        </p>
                    </div>

                    {/* Integrated Slided Tabs Selector */}
                    <div className="flex border border-gray-200/60 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/60 rounded-xl p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => { setAuthMode("login"); setError(""); setSuccessMsg(""); }}
                            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                                authMode === "login"
                                    ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => { setAuthMode("signup"); setError(""); setSuccessMsg(""); }}
                            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                                authMode === "signup"
                                    ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xs"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Message Notification Framework */}
                    {error && (
                        <div className="mb-5 p-3 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2.5 text-xs font-medium">
                            <AlertTriangle size={14} className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {successMsg && (
                        <div className="mb-5 p-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2.5 text-xs font-medium">
                            <CheckCircle size={14} className="flex-shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {/* Interactive Form Processing */}
                    <form onSubmit={handleAuthAction} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">UserId</label>
                            <div className="flex items-center bg-gray-50/50 dark:bg-gray-950/40 border border-gray-200 dark:border-gray-800 rounded-xl focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-gray-950 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-200">
                                <User className="ml-3.5 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder={authMode === "login" ? "Enter UserId" : "Min 3 characters"}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-3 pl-3 bg-transparent outline-none text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400/80"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Security Cipher</label>
                                {authMode === "login" && (
                                    <button type="button" className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline decoration-dotted underline-offset-4">Forgot Cipher?</button>
                                )}
                            </div>
                            <div className="flex items-center bg-gray-50/50 dark:bg-gray-950/40 border border-gray-200 dark:border-gray-800 rounded-xl focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-gray-950 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-200">
                                <Lock className="ml-3.5 text-gray-400" size={16} />
                                <input
                                    type="password"
                                    placeholder={authMode === "login" ? "••••••••••••" : "Min 8 characters"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 pl-3 bg-transparent outline-none text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400/80"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group mt-4 py-3.5 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-950 rounded-xl font-bold tracking-wider text-xs uppercase shadow-md transition-all duration-200 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Execute Login</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}