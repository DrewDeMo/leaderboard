import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    const inputClasses = "block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 transition duration-150 ease-in-out shadow-sm hover:border-tcl-orange-300 focus:border-tcl-orange-500 focus:ring-2 focus:ring-tcl-orange-200 focus:ring-opacity-50 focus:outline-none";
    const buttonClasses = "w-full px-4 py-3 text-sm font-medium text-white bg-tcl-orange-700 rounded-lg hover:bg-tcl-orange-800 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                </label>
                <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClasses}
                    placeholder="Enter your username"
                    autoComplete="username"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClasses}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                />
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={buttonClasses}
                disabled={!username || !password}
            >
                Sign in
            </motion.button>
        </motion.form>
    );
}
