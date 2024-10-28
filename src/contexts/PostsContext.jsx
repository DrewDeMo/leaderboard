import React, { createContext, useContext, useState, useEffect } from 'react';

// Shared initial posts that all users will see
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

// Updated leaderboard with actual teams
const initialLeaderboard = [
    { id: 1, name: 'Wicked Wheaties', score: 0, members: ['Alex', 'Janelle O.', 'Jonathan', 'Larissa', 'Leanne'] },
    { id: 2, name: 'Artificially Intelligent', score: 0, members: ['Amy', 'Drew', 'Jim', 'Michelle', 'Matt E.'] },
    { id: 3, name: 'Falls to the Wall', score: 0, members: ['Emilie', 'Craig', 'Janel E.', 'Kate', 'Luis'] },
    { id: 4, name: 'Harvest Hustlers', score: 0, members: ['James', 'Kari', 'Ciera', 'Mallory', 'Toni'] },
    { id: 5, name: 'Not the Droids You\'re Looking For', score: 0, members: ['Lauren O.', 'Lara', 'Nate', 'Meagan', 'Mitch'] },
    { id: 6, name: 'Nutmeg Hustlers', score: 0, members: ['Lauren H.', 'Kevin', 'Shannon', 'Shane', 'Yovo'] }
];

const PostsContext = createContext();

export function PostsProvider({ children }) {
    // Initialize posts with a combination of localStorage and initial posts
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            const parsedPosts = JSON.parse(savedPosts);
            // Combine saved posts with initial posts, removing duplicates by ID
            const combinedPosts = [...initialPosts, ...parsedPosts];
            const uniquePosts = Array.from(new Map(combinedPosts.map(post => [post.id, post])).values());
            return uniquePosts;
        }
        return initialPosts;
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
                id: Date.now(), // Use timestamp as ID to ensure uniqueness
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
        setPosts(prevPosts => {
            // Don't allow deletion of initial posts
            if (initialPosts.some(post => post.id === postId)) {
                return prevPosts;
            }
            return prevPosts.filter(post => post.id !== postId);
        });
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
