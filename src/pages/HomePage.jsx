import React, { useState } from 'react';

const fullLeaderboard = [
    { name: 'Marketing Team A', score: 950 },
    { name: 'Creative Squad', score: 875 },
    { name: 'Digital Innovators', score: 820 },
    { name: 'Brand Champions', score: 780 },
    { name: 'Social Media Stars', score: 750 },
    { name: 'Content Creators', score: 720 },
    { name: 'Strategy Team', score: 690 },
    { name: 'Analytics Group', score: 650 },
    { name: 'Campaign Experts', score: 620 },
    { name: 'Design Team', score: 600 }
];

const initialPost = {
    id: 1,
    title: 'TCL Marketing Challenge',
    author: 'Danielle',
    date: '2024/01/25',
    difficulty: 'Medium',
    time: '30 minutes',
    description: 'Welcome to the TCL Marketing Challenge! Your task is to create an engaging social media campaign that highlights our brand values and connects with our target audience.',
    hints: [
        'Consider our core values: Innovation, Quality, and Customer Focus',
        'Think about creative ways to showcase our products in real-life scenarios',
        'Remember to incorporate our brand colors and messaging guidelines'
    ]
};

export default function HomePage() {
    const [currentPost] = useState(initialPost);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showAllPlayers, setShowAllPlayers] = useState(false);

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('');
    };

    const getAvatarColor = (name) => {
        const colors = {
            'Marketing Team A': 'bg-blue-500',
            'Creative Squad': 'bg-green-500',
            'Digital Innovators': 'bg-purple-500',
            'Brand Champions': 'bg-pink-500',
            'Social Media Stars': 'bg-yellow-500',
            'Content Creators': 'bg-red-500',
            'Strategy Team': 'bg-indigo-500',
            'Analytics Group': 'bg-cyan-500',
            'Campaign Experts': 'bg-orange-500',
            'Design Team': 'bg-teal-500'
        };
        return colors[name] || 'bg-gray-500';
    };

    const displayedLeaderboard = showAllPlayers ? fullLeaderboard : fullLeaderboard.slice(0, 5);

    return (
        <div className={`min-h-screen bg-gray-50 ${isDarkMode ? 'dark' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">TCL Marketing Challenges</h1>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        {isDarkMode ? '🌞' : '🌙'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Current Challenge Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <h2 className="text-2xl font-bold text-orange-500 mb-4">{currentPost.title}</h2>
                            <div className="flex items-center mt-4 space-x-2 mb-6">
                                <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
                                    <span className="text-sm">{currentPost.author[0]}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{currentPost.author}</p>
                                    <p className="text-xs text-gray-500">Challenge Creator</p>
                                </div>
                                <div className="text-sm text-gray-500 ml-4">
                                    {currentPost.date}
                                </div>
                                <div className="ml-auto flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">{currentPost.difficulty}</span>
                                    <span className="text-sm text-gray-600">• {currentPost.time}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">{currentPost.description}</p>
                            <h3 className="text-lg font-medium mb-4">Helpful Tips:</h3>
                            <ol className="list-decimal pl-4 space-y-2">
                                {currentPost.hints.map((hint, index) => (
                                    <li key={index} className="text-gray-600">{hint}</li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {/* Leaderboard Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-orange-500 flex items-center">
                                    <span className="mr-2">🏆</span> Top Performers
                                </h2>
                                <button
                                    onClick={() => setShowAllPlayers(!showAllPlayers)}
                                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                                >
                                    {showAllPlayers ? 'Show Less' : 'View All'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                {displayedLeaderboard.map((player, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between p-3 rounded-lg ${index < 3 ? 'bg-orange-50' : ''}`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-full ${getAvatarColor(player.name)} flex items-center justify-center text-white font-medium`}>
                                                {getInitials(player.name)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{player.name}</p>
                                                {index < 3 && (
                                                    <p className="text-sm text-gray-500">
                                                        {index === 0 ? '🥇 Gold' : index === 1 ? '🥈 Silver' : '🥉 Bronze'}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-lg font-semibold text-orange-500">
                                            {player.score}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
