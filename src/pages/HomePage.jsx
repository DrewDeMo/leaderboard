import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosts } from '../contexts/PostsContext';
import Logo from '../components/Logo';

export default function HomePage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showAllPlayers, setShowAllPlayers] = useState(false);
    const { posts, leaderboard } = usePosts();

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('');
    };

    const getAvatarColor = (name) => {
        const colors = {
            'Wicked Wheaties': 'bg-blue-500',
            'Artificially Intelligent': 'bg-green-500',
            'Falls to the Wall': 'bg-purple-500',
            'Harvest Hustlers': 'bg-pink-500',
            'Not the Droids You\'re Looking For': 'bg-yellow-500',
            'Nutmeg Hustlers': 'bg-red-500'
        };
        return colors[name] || 'bg-gray-500';
    };

    const displayedLeaderboard = showAllPlayers ? leaderboard : leaderboard.slice(0, 5);

    if (!posts.length) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading challenges...</p>
            </div>
        );
    }

    const currentPost = posts[0]; // Always show the first post since we only have one

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''} bg-gray-50`}>
            {/* Header */}
            <header className="bg-white border-b border-gray-100">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 sm:w-[60px] sm:h-[60px] text-[#cc5500] flex items-center justify-center flex-shrink-0 transition-shadow hover:shadow-md">
                                <Logo />
                            </div>
                            <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">TCL Scavenger Hunt 2024</h1>
                        </div>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-150 ease-in-out"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? '🌞' : '🌙'}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-grow py-6 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPost.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                                >
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentPost.title}</h2>
                                        <div className="flex flex-wrap items-center gap-4 mb-6">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-[#cc5500] bg-opacity-10 flex items-center justify-center">
                                                    <span className="text-sm text-[#cc5500] font-medium">{currentPost.author[0]}</span>
                                                </div>
                                                <div className="ml-2.5">
                                                    <p className="text-sm font-medium text-gray-900">{currentPost.author}</p>
                                                    <p className="text-xs text-gray-500">Challenge Creator</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-sm text-gray-500">{currentPost.date}</span>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-800 border border-orange-100">
                                                    {currentPost.difficulty}
                                                </span>
                                                <span className="text-sm text-gray-500">{currentPost.time}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed mb-6">{currentPost.description}</p>
                                        <div className="bg-orange-50 rounded-xl p-5 mb-6 border border-orange-100">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">Helpful Tips:</h3>
                                            <ol className="list-decimal pl-4 space-y-2.5">
                                                {currentPost.hints.map((hint, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="text-gray-600 pl-1"
                                                    >
                                                        {hint}
                                                    </motion.li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                            <span className="mr-2">🏆</span> Top Performers
                                        </h2>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setShowAllPlayers(!showAllPlayers)}
                                            className="text-[#cc5500] hover:text-orange-600 text-sm font-medium"
                                        >
                                            {showAllPlayers ? 'Show Less' : 'View All'}
                                        </motion.button>
                                    </div>

                                    <div className="space-y-3">
                                        {displayedLeaderboard.map((player, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`flex items-center justify-between p-3 rounded-xl border ${index < 3 ? 'bg-orange-50 border-orange-100' : 'border-gray-100'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        className={`w-8 h-8 rounded-full ${getAvatarColor(player.name)} flex items-center justify-center text-white font-medium shadow-sm`}
                                                    >
                                                        {getInitials(player.name)}
                                                    </motion.div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{player.name}</p>
                                                        {index < 3 && (
                                                            <p className="text-xs text-gray-500">
                                                                {index === 0 ? '🥇 Gold' : index === 1 ? '🥈 Silver' : '🥉 Bronze'}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-lg font-semibold text-[#cc5500]">
                                                    {player.score}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} TCL Scavenger Hunt 2024. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
