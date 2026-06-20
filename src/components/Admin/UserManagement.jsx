import { useEffect, useState } from "react";
import axios from "axios";
import { Users, AlertCircle, RefreshCw, Shield, UserCheck, Hash } from "lucide-react";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch live users directly from your PostgreSQL Express API endpoint
    const fetchSystemUsers = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:5000/users");
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to sync system users from database cluster.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSystemUsers();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header Subsection Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-900">
                <div>
                    <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                        <Users className="text-blue-500" size={20} />
                        <span>System Operators Ledger</span>
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        Live directory of registered users, administrators, and privileges in your cluster database.
                    </p>
                </div>

                <button
                    onClick={fetchSystemUsers}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/80 active:scale-95 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                    <span>Sync Node</span>
                </button>
            </div>

            {/* Error Message Module if network fails */}
            {error && (
                <div className="p-4 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-start gap-3 text-xs font-medium">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Data Pipeline / Table UI Frame */}
            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Querying Table Rows...</span>
                </div>
            ) : users.length === 0 ? (
                <div className="py-16 text-center text-sm font-mono text-gray-400">
                    No operating instances found inside relation table array strings.
                </div>
            ) : (
                <div className="w-full overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-950/10">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/20 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            <th className="px-4 py-3.5"><div className="flex items-center gap-1.5"><Hash size={12}/>ID</div></th>
                            <th className="px-6 py-3.5"><div className="flex items-center gap-1.5"><UserCheck size={12}/>Operator Name</div></th>
                            <th className="px-6 py-3.5"><div className="flex items-center gap-1.5"><Shield size={12}/>Authorization Tier</div></th>
                            <th className="px-4 py-3.5 text-right">Access Token Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-900 text-sm">
                        {users.map((row) => {
                            const isAdmin = row.role === "admin";
                            return (
                                <tr
                                    key={row.id}
                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-900/10 transition-colors"
                                >
                                    {/* Serial Database Key ID */}
                                    <td className="px-4 py-4 font-mono text-xs text-gray-400">
                                        #{row.id}
                                    </td>

                                    {/* Operator Identity Username */}
                                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-gray-200">
                                        {row.username}
                                    </td>

                                    {/* Dynamic Authorization Badges */}
                                    <td className="px-6 py-4">
                                            <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                                                isAdmin
                                                    ? "bg-purple-500/5 border-purple-500/20 text-purple-600 dark:text-purple-400"
                                                    : "bg-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400"
                                            }`}>
                                                {row.role}
                                            </span>
                                    </td>

                                    {/* Status Context Actions */}
                                    <td className="px-4 py-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Active
                                            </span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}