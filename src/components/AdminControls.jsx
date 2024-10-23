import React, { useState } from 'react';

export default function AdminControls({ posts, setPosts, leaderboard, setLeaderboard }) {
    const [editingPost, setEditingPost] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        difficulty: 'Easy',
        time: '',
        hints: ['']
    });
    const [newPlayer, setNewPlayer] = useState({
        name: '',
        score: ''
    });

    const addPost = () => {
        const post = {
            ...newPost,
            id: posts.length + 1,
            author: 'Admin',
            date: new Date().toLocaleDateString()
        };
        setPosts([...posts, post]);
        setNewPost({
            title: '',
            description: '',
            difficulty: 'Easy',
            time: '',
            hints: ['']
        });
    };

    const updatePost = () => {
        if (!editingPost) return;
        const updatedPosts = posts.map(post =>
            post.id === editingPost.id ? { ...editingPost, date: new Date().toLocaleDateString() } : post
        );
        setPosts(updatedPosts);
        setEditingPost(null);
    };

    const addHint = () => {
        if (editingPost) {
            setEditingPost({
                ...editingPost,
                hints: [...editingPost.hints, '']
            });
        } else {
            setNewPost({
                ...newPost,
                hints: [...newPost.hints, '']
            });
        }
    };

    const updateHint = (index, value, isEditing = false) => {
        if (isEditing) {
            const updatedHints = [...editingPost.hints];
            updatedHints[index] = value;
            setEditingPost({
                ...editingPost,
                hints: updatedHints
            });
        } else {
            const updatedHints = [...newPost.hints];
            updatedHints[index] = value;
            setNewPost({
                ...newPost,
                hints: updatedHints
            });
        }
    };

    const removeHint = (index, isEditing = false) => {
        if (isEditing) {
            const updatedHints = editingPost.hints.filter((_, i) => i !== index);
            setEditingPost({
                ...editingPost,
                hints: updatedHints
            });
        } else {
            const updatedHints = newPost.hints.filter((_, i) => i !== index);
            setNewPost({
                ...newPost,
                hints: updatedHints
            });
        }
    };

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

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-orange-500">Manage Posts</h3>

                {/* Post List */}
                <div className="mb-8">
                    <h4 className="text-lg font-medium mb-4">Existing Posts</h4>
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div key={post.id} className="border rounded-lg p-4 hover:border-orange-200">
                                <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-medium">{post.title}</h5>
                                    <button
                                        onClick={() => setEditingPost(post)}
                                        className="text-orange-500 hover:text-orange-600"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{post.description.substring(0, 100)}...</p>
                                <div className="text-xs text-gray-500">
                                    {post.date} • {post.difficulty} • {post.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Edit Post Form */}
                {editingPost && (
                    <div className="border-t pt-6 mb-8">
                        <h4 className="text-lg font-medium mb-4">Edit Post</h4>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={editingPost.title}
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                            />
                            <textarea
                                placeholder="Description"
                                value={editingPost.description}
                                onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                                className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                            />
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Time (e.g., 15 minutes)"
                                    value={editingPost.time}
                                    onChange={(e) => setEditingPost({ ...editingPost, time: e.target.value })}
                                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                                />
                                <select
                                    value={editingPost.difficulty}
                                    onChange={(e) => setEditingPost({ ...editingPost, difficulty: e.target.value })}
                                    className="p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                                >
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Hints</label>
                                {editingPost.hints.map((hint, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={hint}
                                            onChange={(e) => updateHint(index, e.target.value, true)}
                                            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                                        />
                                        <button
                                            onClick={() => removeHint(index, true)}
                                            className="px-3 py-2 text-red-500 hover:text-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addHint}
                                    className="text-sm text-orange-500 hover:text-orange-600"
                                >
                                    + Add Hint
                                </button>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={updatePost}
                                    className="flex-1 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditingPost(null)}
                                    className="flex-1 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Post Form */}
                {!editingPost && (
                    <div className="border-t pt-6">
                        <h4 className="text-lg font-medium mb-4">Add New Post</h4>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                            />
                            <textarea
                                placeholder="Description"
                                value={newPost.description}
                                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                                className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                            />
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Time (e.g., 15 minutes)"
                                    value={newPost.time}
                                    onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                                />
                                <select
                                    value={newPost.difficulty}
                                    onChange={(e) => setNewPost({ ...newPost, difficulty: e.target.value })}
                                    className="p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                                >
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Hints</label>
                                {newPost.hints.map((hint, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={hint}
                                            onChange={(e) => updateHint(index, e.target.value)}
                                            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                                        />
                                        <button
                                            onClick={() => removeHint(index)}
                                            className="px-3 py-2 text-red-500 hover:text-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addHint}
                                    className="text-sm text-orange-500 hover:text-orange-600"
                                >
                                    + Add Hint
                                </button>
                            </div>

                            <button
                                onClick={addPost}
                                className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Add Post
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-orange-500">Manage Leaderboard</h3>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Player Name"
                            value={newPlayer.name}
                            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                        />
                        <input
                            type="number"
                            placeholder="Score"
                            value={newPlayer.score}
                            onChange={(e) => setNewPlayer({ ...newPlayer, score: e.target.value })}
                            className="w-24 p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                        />
                        <button
                            onClick={addPlayer}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Add
                        </button>
                    </div>

                    <div className="space-y-2">
                        {leaderboard.map((player, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="flex-1">{player.name}</span>
                                <input
                                    type="number"
                                    value={player.score}
                                    onChange={(e) => updatePlayerScore(index, e.target.value)}
                                    className="w-24 p-2 border rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
