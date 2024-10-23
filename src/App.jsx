import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import AdminControls from './components/AdminControls';

const initialPosts = [
  {
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
  }
];

const initialLeaderboard = [
  { name: 'Marketing Team A', score: 950 },
  { name: 'Creative Squad', score: 875 },
  { name: 'Digital Innovators', score: 820 },
  { name: 'Brand Champions', score: 780 },
  { name: 'Social Media Stars', score: 750 }
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [currentPost, setCurrentPost] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  const handleNextPost = () => {
    setCurrentPost((prev) => (prev + 1) % posts.length);
  };

  const handlePrevPost = () => {
    setCurrentPost((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('');
  };

  const getAvatarColor = (name) => {
    const colors = {
      'Marketing Team A': 'bg-blue-500',
      'Creative Squad': 'bg-green-500',
      'Digital Innovators': 'bg-purple-500',
      'Brand Champions': 'bg-pink-500',
      'Social Media Stars': 'bg-yellow-500'
    };
    return colors[name] || 'bg-gray-500';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-semibold text-gray-800">TCL Marketing Challenges</h1>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          )}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        <div className="flex-1 bg-gray-50 rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-500">{posts[currentPost].title}</h2>
            <div className="flex items-center mt-4 space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
                <span className="text-sm">{posts[currentPost].author[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{posts[currentPost].author}</p>
                <p className="text-xs text-gray-500">Challenge Creator</p>
              </div>
              <div className="text-sm text-gray-500 ml-4">
                {posts[currentPost].date}
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <span className="text-sm text-gray-600">{posts[currentPost].difficulty}</span>
                <span className="text-sm text-gray-600">• {posts[currentPost].time}</span>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">{posts[currentPost].description}</p>
            <h3 className="text-lg font-medium mb-4">Helpful Tips:</h3>
            <ol className="list-decimal pl-4 space-y-2">
              {posts[currentPost].hints.map((hint, index) => (
                <li key={index} className="text-gray-600">{hint}</li>
              ))}
            </ol>
          </div>

          {posts.length > 1 && (
            <div className="mt-8 pt-4 border-t flex justify-between items-center">
              <button
                onClick={handlePrevPost}
                className="text-gray-600 flex items-center"
              >
                <span>← Previous Challenge</span>
              </button>
              <span className="text-sm text-gray-500">Challenge {currentPost + 1} of {posts.length}</span>
              <button
                onClick={handleNextPost}
                className="text-gray-600 flex items-center"
              >
                <span>Next Challenge →</span>
              </button>
            </div>
          )}
        </div>

        <div className="w-80 space-y-6">
          {isAdminPage ? (
            !isAuthenticated ? (
              <LoginForm />
            ) : (
              <AdminControls
                posts={posts}
                setPosts={setPosts}
                leaderboard={leaderboard}
                setLeaderboard={setLeaderboard}
              />
            )
          ) : null}

          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold text-orange-500 mb-6 flex items-center">
              <span className="mr-2">🏆</span> Top Performers
            </h3>
            <div className="space-y-4">
              {leaderboard.map((player, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${getAvatarColor(player.name)} flex items-center justify-center text-white`}>
                      {getInitials(player.name)}
                    </div>
                    <span className="ml-3 text-gray-700">{player.name}</span>
                  </div>
                  <span className="text-orange-500 font-medium">{player.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
