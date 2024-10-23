import React, { createContext, useContext, useState, useEffect } from 'react';

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
    },
    {
        id: 2,
        title: 'Brand Awareness Campaign',
        author: 'Danielle',
        date: '2024/01/26',
        difficulty: 'Hard',
        time: '45 minutes',
        description: 'Design a comprehensive brand awareness campaign that will increase TCL\'s visibility in key market segments.',
        hints: [
            'Research current market trends and competitor strategies',
            'Identify unique selling propositions that set TCL apart',
            'Consider multiple marketing channels for maximum reach'
        ]
    },
    {
        id: 3,
        title: 'Content Strategy Development',
        author: 'Danielle',
        date: '2024/01/27',
        difficulty: 'Medium',
        time: '35 minutes',
        description: 'Create a content strategy that aligns with TCL\'s marketing objectives and resonates with our target audience.',
        hints: [
            'Define clear content pillars and themes',
            'Plan content distribution across different platforms',
            'Incorporate SEO best practices'
        ]
    }
];

const initialLeaderboard = [
    { id: 1, name: 'Marketing Team A', score: 950 },
    { id: 2, name: 'Creative Squad', score: 875 },
    { id: 3, name: 'Digital Innovators', score: 820 },
    { id: 4, name: 'Brand Champions', score: 780 },
    { id: 5, name: 'Social Media Stars', score: 750 },
    { id: 6, name: 'Content Creators', score: 720 },
    { id: 7, name: 'Strategy Team', score: 690 },
    { id: 8, name: 'Analytics Group', score: 650 },
    { id: 9, name: 'Campaign Experts', score: 620 },
    { id: 10, name: 'Design Team', score: 600 }
];

const PostsContext = createContext();

export function PostsProvider({ children }) {
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('posts');
        return savedPosts ? JSON.parse(savedPosts) : initialPosts;
    });

    const [leaderboard, setLeaderboard] = useState(() => {
        const savedLeaderboard = localStorage.getItem('leaderboard');
        return savedLeaderboard ? JSON.parse(savedLeaderboard) : initialLeaderboard;
    });

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }, [leaderboard]);

    const addPost = (newPost) => {
        setPosts(prevPosts => {
            const post = {
                ...newPost,
                id: prevPosts.length + 1,
                author: 'Danielle',
                date: new Date().toLocaleDateString('en-CA')
            };
            return [...prevPosts, post];
        });
    };

    const updatePost = (updatedPost) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === updatedPost.id
                    ? { ...updatedPost, date: new Date().toLocaleDateString('en-CA') }
                    : post
            )
        );
    };

    const deletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    const addLeaderboardEntry = (entry) => {
        setLeaderboard(prev => {
            const newEntry = { ...entry, id: prev.length + 1 };
            const updated = [...prev, newEntry].sort((a, b) => b.score - a.score);
            return updated;
        });
    };

    const updateLeaderboardEntry = (updatedEntry) => {
        setLeaderboard(prev => {
            const updated = prev.map(entry =>
                entry.id === updatedEntry.id ? updatedEntry : entry
            ).sort((a, b) => b.score - a.score);
            return updated;
        });
    };

    const deleteLeaderboardEntry = (entryId) => {
        setLeaderboard(prev => prev.filter(entry => entry.id !== entryId));
    };

    return (
        <PostsContext.Provider value={{
            posts,
            leaderboard,
            addPost,
            updatePost,
            deletePost,
            addLeaderboardEntry,
            updateLeaderboardEntry,
            deleteLeaderboardEntry
        }}>
            {children}
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
}
