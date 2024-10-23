import React, { useState } from 'react';

const posts = [
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

const leaderboard = [
  { name: 'Alice Johnson', score: 1200 },
  { name: 'Bob Smith', score: 1150 },
  { name: 'Charlie Brown', score: 1100 },
  { name: 'Diana Prince', score: 1050 },
  { name: 'Ethan Hunt', score: 1000 }
];

function App() {
  const [currentPost, setCurrentPost] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      'Alice Johnson': 'bg-pink-500',
      'Bob Smith': 'bg-blue-500',
      'Charlie Brown': 'bg-green-500',
      'Diana Prince': 'bg-gray-500',
      'Ethan Hunt': 'bg-gray-400'
    };
    return colors[name] || 'bg-gray-500';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-semibold text-gray-800">Scavenger Hunt Dashboard</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="flex gap-6 p-6">
        <div className="flex-1 bg-gray-50 rounded-lg p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-500">{posts[currentPost].title}</h2>
            <div className="flex items-center mt-4 space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm">J</span>
              </div>
              <div>
                <p className="text-sm font-medium">{posts[currentPost].author}</p>
                <p className="text-xs text-gray-500">Hunt Master</p>
              </div>
              <div className="text-sm text-gray-500 ml-4">
                {posts[currentPost].date}
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <span className="text-sm text-gray-600">Easy</span>
                <span className="text-sm text-gray-600">• {posts[currentPost].time}</span>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">{posts[currentPost].description}</p>
            <h3 className="text-lg font-medium mb-4">Here are some hints to guide your search:</h3>
            <ol className="list-decimal pl-4 space-y-2">
              {posts[currentPost].hints.map((hint, index) => (
                <li key={index} className="text-gray-600">{hint}</li>
              ))}
            </ol>
          </div>

          <div className="mt-8 pt-4 border-t flex justify-between items-center">
            <button
              onClick={handlePrevPost}
              className="text-gray-600 flex items-center"
            >
              <span>← Previous Task</span>
            </button>
            <span className="text-sm text-gray-500">Task {currentPost + 1} of {posts.length}</span>
            <button
              onClick={handleNextPost}
              className="text-gray-600 flex items-center"
            >
              <span>Next Task →</span>
            </button>
          </div>
        </div>

        <div className="w-80 bg-white rounded-lg p-6">
          <h3 className="text-xl font-semibold text-orange-500 mb-6 flex items-center">
            <span className="mr-2">🏆</span> Leaderboard
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
  );
}

export default App;
