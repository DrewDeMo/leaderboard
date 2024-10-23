import React, { useState } from 'react';

export default function AdminPosts({ posts, setPosts }) {
    const [editingPost, setEditingPost] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        difficulty: 'Easy',
        time: '',
        hints: ['']
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

    const addHint = (isEditing = false) => {
        if (isEditing) {
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

    return (
        <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Posts</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your scavenger hunt posts here.
                    </p>
                </div>

                {/* Post List */}
                <div className="px-6 py-4">
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                            >
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">{post.title}</h3>
                                    <p className="text-sm text-gray-500">{post.date}</p>
                                </div>
                                <button
                                    onClick={() => setEditingPost(post)}
                                    className="text-sm text-orange-500 hover:text-orange-600"
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            {editingPost && (
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Post</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={editingPost.title}
                            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        <textarea
                            placeholder="Description"
                            value={editingPost.description}
                            onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                            rows={4}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Time"
                                value={editingPost.time}
                                onChange={(e) => setEditingPost({ ...editingPost, time: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            <select
                                value={editingPost.difficulty}
                                onChange={(e) => setEditingPost({ ...editingPost, difficulty: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
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
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                    />
                                    <button
                                        onClick={() => removeHint(index, true)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addHint(true)}
                                className="text-sm text-orange-500 hover:text-orange-600"
                            >
                                Add Hint
                            </button>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setEditingPost(null)}
                                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updatePost}
                                className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Post Form */}
            {!editingPost && (
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">New Post</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        <textarea
                            placeholder="Description"
                            value={newPost.description}
                            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                            rows={4}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Time"
                                value={newPost.time}
                                onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            />
                            <select
                                value={newPost.difficulty}
                                onChange={(e) => setNewPost({ ...newPost, difficulty: e.target.value })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
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
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                    />
                                    <button
                                        onClick={() => removeHint(index)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addHint(false)}
                                className="text-sm text-orange-500 hover:text-orange-600"
                            >
                                Add Hint
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={addPost}
                                className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600"
                            >
                                Create Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
