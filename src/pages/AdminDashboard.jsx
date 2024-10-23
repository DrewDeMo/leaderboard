import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const navLinkClasses = (isActive) => `
        inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-all duration-150 ease-in-out
        ${isActive
            ? 'border-tcl-orange-700 text-tcl-orange-700'
            : 'border-transparent text-gray-500 hover:border-tcl-orange-200 hover:text-tcl-orange-600'
        }
    `;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-shrink-0 flex items-center"
                            >
                                <div className="w-10 h-10 rounded-full bg-tcl-orange-700 flex items-center justify-center shadow-sm">
                                    <span className="text-lg font-bold text-white">TCL</span>
                                </div>
                                <h1 className="ml-3 text-xl font-bold text-gray-900">
                                    Marketing Dashboard
                                </h1>
                            </motion.div>
                            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Link
                                        to="/admin/posts"
                                        className={navLinkClasses(location.pathname === '/admin/posts')}
                                    >
                                        Posts
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Link
                                        to="/admin/leaderboard"
                                        className={navLinkClasses(location.pathname === '/admin/leaderboard')}
                                    >
                                        Leaderboard
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-tcl-orange-200 text-sm font-medium rounded-lg text-tcl-orange-700 hover:bg-tcl-orange-50 hover:border-tcl-orange-300 transition-colors duration-150 ease-in-out shadow-sm hover:shadow"
                            >
                                Sign out
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="py-10"
            >
                <main>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </motion.div>
        </div>
    );
}
