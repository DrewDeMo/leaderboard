import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosts } from '../contexts/PostsContext';

export default function AdminLeaderboard() {
    const { leaderboard, addLeaderboardEntry, updateLeaderboardEntry, deleteLeaderboardEntry } = usePosts();
    const [newPlayer, setNewPlayer] = useState({ name: '', score: '', group: 'Analytics Group' });
    const [searchTerm, setSearchTerm] = useState('');

    const addPlayer = () => {
        if (newPlayer.name && newPlayer.score) {
            addLeaderboardEntry({
                name: newPlayer.name,
                score: parseInt(newPlayer.score),
                group: newPlayer.group
            });
            setNewPlayer({ name: '', score: '', group: 'Analytics Group' });
        }
    };

    const updatePlayerScore = (player, newScore) => {
        updateLeaderboardEntry({
            ...player,
            score: parseInt(newScore) || 0
        });
    };

    const filteredPlayers = leaderboard
        .filter(player => player.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.score - a.score);

    const inputClasses = "block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 transition duration-150 ease-in-out shadow-sm hover:border-tcl-orange-300 focus:border-tcl-orange-500 focus:ring-2 focus:ring-tcl-orange-200 focus:ring-opacity-50 focus:outline-none";
    const buttonClasses = "px-4 py-3 text-sm font-medium text-white bg-tcl-orange-500 rounded-lg hover:bg-tcl-orange-600 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Leaderboard</h2>

                {/* Add New Player Form */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Player Name"
                        value={newPlayer.name}
                        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                        className={inputClasses}
                    />
                    <input
                        type="number"
                        placeholder="Score"
                        value={newPlayer.score}
                        onChange={(e) => setNewPlayer({ ...newPlayer, score: e.target.value })}
                        className={inputClasses}
                    />
                    <select
                        value={newPlayer.group}
                        onChange={(e) => setNewPlayer({ ...newPlayer, group: e.target.value })}
                        className={inputClasses}
                    >
                        <option>Analytics Group</option>
                        <option>Campaign Experts</option>
                        <option>Design Team</option>
                        <option>Marketing Team A</option>
                        <option>Creative Squad</option>
                        <option>Digital Innovators</option>
                        <option>Brand Champions</option>
                        <option>Social Media Stars</option>
                        <option>Content Creators</option>
                        <option>Strategy Team</option>
                    </select>
                    <button
                        onClick={addPlayer}
                        disabled={!newPlayer.name || !newPlayer.score}
                        className={buttonClasses}
                    >
                        Add Player
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search players..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={inputClasses}
                    />
                </div>

                {/* Players List */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredPlayers.map((player, index) => (
                            <motion.div
                                key={player.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className={`flex items-center justify-between p-4 rounded-lg border ${index < 3 ? 'bg-orange-50 border-orange-100' : 'border-gray-200'
                                    }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${index === 0 ? 'bg-yellow-500' :
                                            index === 1 ? 'bg-gray-400' :
                                                index === 2 ? 'bg-tcl-orange-500' :
                                                    'bg-gray-300'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{player.name}</h3>
                                        <p className="text-sm text-gray-500">{player.group}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="number"
                                        value={player.score}
                                        onChange={(e) => updatePlayerScore(player, e.target.value)}
                                        className="w-24 rounded-lg border border-gray-200 px-3 py-2 text-right"
                                    />
                                    <button
                                        onClick={() => deleteLeaderboardEntry(player.id)}
                                        className="p-2 text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
