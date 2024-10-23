import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';

export default function AdminLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleLogin = async (username, password) => {
        try {
            setError('');
            await login(username, password);
            navigate('/admin/posts');
        } catch (error) {
            setError('Invalid username or password');
            console.error('Failed to log in:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 rounded-full bg-tcl-orange-700 flex items-center justify-center shadow-lg hover:bg-tcl-orange-800 transition-colors"
                    >
                        <span className="text-2xl font-bold text-white">TCL</span>
                    </motion.div>
                </div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-center text-3xl font-bold text-gray-900"
                >
                    Welcome Back
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-2 text-center text-sm text-gray-600"
                >
                    Sign in to manage your marketing challenges
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <div className="bg-white py-8 px-4 shadow-sm rounded-lg border border-gray-200 sm:px-10">
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-4 p-4 rounded-lg bg-red-50 border border-red-100"
                            >
                                <p className="text-sm text-red-600">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <LoginForm onSubmit={handleLogin} />
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Protected area
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
