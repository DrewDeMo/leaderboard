import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosts } from '../contexts/PostsContext';

export default function AdminPosts() {
    const { posts, addPost, updatePost, deletePost } = usePosts();
    const [editingPost, setEditingPost] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        difficulty: 'Easy',
        time: '',
        hints: ['']
    });

    const handleAddPost = () => {
        if (newPost.title && newPost.description) {
            addPost(newPost);
            setNewPost({
                title: '',
                description: '',
                difficulty: 'Easy',
                time: '',
                hints: ['']
            });
        }
    };

    const handleUpdatePost = () => {
        if (!editingPost) return;
        updatePost(editingPost);
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

    const inputClasses = "block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 transition duration-150 ease-in-out shadow-sm hover:border-tcl-orange-300 focus:border-tcl-orange-500 focus:ring-2 focus:ring-tcl-orange-200 focus:ring-opacity-50 focus:outline-none";
    const buttonClasses = "px-4 py-3 text-sm font-medium text-white bg-tcl-orange-700 rounded-lg hover:bg-tcl-orange-800 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900">Marketing Challenges</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your marketing challenges here.
                    </p>
                </div>

                {/* Post List */}
                <div className="p-6">
                    <div className="space-y-4">
                        <AnimatePresence>
                            {posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200 group"
                                >
                                    <div>
                                        <h3 className="font-medium text-gray-900 group-hover:text-tcl-orange-700 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{post.date}</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setEditingPost(post)}
                                            className="text-sm font-medium text-tcl-orange-700 hover:text-tcl-orange-800 transition-colors"
                                        >
                                            Edit
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => deletePost(post.id)}
                                            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            Delete
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Edit Form */}
            <AnimatePresence>
                {editingPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
                    >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Challenge</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={editingPost.title}
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                className={inputClasses}
                            />
                            <textarea
                                placeholder="Description"
                                value={editingPost.description}
                                onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                                rows={4}
                                className={inputClasses}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Time"
                                    value={editingPost.time}
                                    onChange={(e) => setEditingPost({ ...editingPost, time: e.target.value })}
                                    className={inputClasses}
                                />
                                <select
                                    value={editingPost.difficulty}
                                    onChange={(e) => setEditingPost({ ...editingPost, difficulty: e.target.value })}
                                    className={inputClasses}
                                >
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Hints</label>
                                <AnimatePresence>
                                    {editingPost.hints.map((hint, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex gap-2"
                                        >
                                            <input
                                                type="text"
                                                value={hint}
                                                onChange={(e) => updateHint(index, e.target.value, true)}
                                                className={inputClasses}
                                                placeholder={`Hint ${index + 1}`}
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => removeHint(index, true)}
                                                className="text-red-500 hover:text-red-600 transition-colors"
                                            >
                                                Remove
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => addHint(true)}
                                    className="text-sm font-medium text-tcl-orange-700 hover:text-tcl-orange-800 transition-colors"
                                >
                                    Add Hint
                                </motion.button>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setEditingPost(null)}
                                    className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleUpdatePost}
                                    className={buttonClasses}
                                >
                                    Save Changes
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* New Post Form */}
            {!editingPost && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
                >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">New Challenge</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            className={inputClasses}
                        />
                        <textarea
                            placeholder="Description"
                            value={newPost.description}
                            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                            rows={4}
                            className={inputClasses}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Time"
                                value={newPost.time}
                                onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                                className={inputClasses}
                            />
                            <select
                                value={newPost.difficulty}
                                onChange={(e) => setNewPost({ ...newPost, difficulty: e.target.value })}
                                className={inputClasses}
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Hints</label>
                            <AnimatePresence>
                                {newPost.hints.map((hint, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={hint}
                                            onChange={(e) => updateHint(index, e.target.value)}
                                            className={inputClasses}
                                            placeholder={`Hint ${index + 1}`}
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => removeHint(index)}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            Remove
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addHint(false)}
                                className="text-sm font-medium text-tcl-orange-700 hover:text-tcl-orange-800 transition-colors"
                            >
                                Add Hint
                            </motion.button>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddPost}
                            disabled={!newPost.title || !newPost.description}
                            className={buttonClasses}
                        >
                            Add Challenge
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
