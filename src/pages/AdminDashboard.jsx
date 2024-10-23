import React, { useState } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminPosts from './AdminPosts';
import AdminLeaderboard from './AdminLeaderboard';

const initialPosts = [
    {
        id: 1,
        title: 'Find the hidden QR code',
        author: 'Jane Doe',
        date: '5/14/2023',
        difficulty: 'Easy',
        time: '15 minutes',
        description: 'Your mission, should you choose to accept it, is to locate a cleverly concealed QR code in the break room. This isn\'t just any QR code - it\'s your key to unlocking the next clue in our office-wide scavenger hunt.',
        hints: [
            'Look high and low – the code could be anywhere from eye level to under a table.',
            'Check common areas – think coffee machine, bulletin board, or even the fridge.',
            "Don't disturb your coworkers' belongings – the code is in a public space."
        ]
    },
    {
        id: 2,
        title: 'Next Task',
        author: 'Jane Doe',
        date: '5/15/2023',
        difficulty: 'Medium',
        time: '20 minutes',
        description: 'This is the next clue in your scavenger hunt journey.',
        hints: ['Sample hint 1', 'Sample hint 2', 'Sample hint 3']
    }
];

export default function AdminDashboard() {
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [posts, setPosts] = useState(initialPosts);
    const [leaderboard, setLeaderboard] = useState([]);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-orange-500">Admin Dashboard</h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    to="/admin/posts"
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location.pathname === '/admin/posts'
                                            ? 'border-orange-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                >
                                    Posts
                                </Link>
                                <Link
                                    to="/admin/leaderboard"
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${location.pathname === '/admin/leaderboard'
                                            ? 'border-orange-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                >
                                    Leaderboard
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-500 hover:text-orange-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="posts" element={<AdminPosts posts={posts} setPosts={setPosts} />} />
                    <Route path="leaderboard" element={<AdminLeaderboard leaderboard={leaderboard} setLeaderboard={setLeaderboard} />} />
                </Routes>
            </main>
        </div>
    );
}
