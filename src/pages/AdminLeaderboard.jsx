import React, { useState } from 'react';

export default function AdminLeaderboard({ leaderboard, setLeaderboard }) {
    const [newPlayer, setNewPlayer] = useState({ name: '', score: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const addPlayer = () => {
        if (newPlayer.name && newPlayer.score) {
            setLeaderboard([...leaderboard, newPlayer]);
            setNewPlayer({ name: '', score: '' });
        }
    };

    const updatePlayerScore = (index, newScore) => {
        const updatedLeaderboard = [...leaderboard];
        updatedLeaderboard[index] = {
            ...updatedLeaderboard[index],
            score: parseInt(newScore)
        };
        setLeaderboard(updatedLeaderboard.sort((a, b) => b.score - a.score));
    };

    const filteredLeaderboard = leaderboard.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Leaderboard</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage player scores and rankings.
                    </p>
                </div>

                <div className="p-6">
                    <div className="space-y-4">
                        {/* Add New Player */}
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Player Name"
                                value={newPlayer.name}
                                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            <input
                                type="number"
                                placeholder="Score"
                                value={newPlayer.score}
                                onChange={(e) => setNewPlayer({ ...newPlayer, score: e.target.value })}
                                className="w-32 rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            <button
                                onClick={addPlayer}
                                className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600"
                            >
                                Add Player
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Search players..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        {/* Player List */}
                        <div className="mt-6">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                Rank
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Player
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Score
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {filteredLeaderboard.map((player, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                                                    #{index + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                    {player.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <input
                                                        type="number"
                                                        value={player.score}
                                                        onChange={(e) => updatePlayerScore(index, e.target.value)}
                                                        className="w-24 rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
