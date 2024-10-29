import React, { createContext, useContext } from 'react';

// Single static post
const currentPost = {
    id: 1,
    title: 'Day 1: Autumn Adventure Photo Challenge',
    author: 'Danielle',
    date: '2024/01/25',
    difficulty: 'Medium',
    time: '30 minutes',
    description: 'Hello, Scavenger Hunt Teams!\n\nTo kick off our scavenger hunt, each team member will need to find and photograph a unique item that embodies the essence of fall. Once everyone has their photos, the team can work together to compile them into a collage representing your team\'s autumn adventure.',
    hints: [
        'Ensure your team\'s name is included in your submission',
        'To receive full points, your team\'s nominated captain must post the collage in the Microsoft Teams General channel',
        'Include a fun fall fact about one of the items in your collage for an additional 5 points',
        'Create a unique caption (one per team member) to earn a total of 5 extra points',
        'Submissions are due by 5:00 PM EST. Happy snapping! 🍁🌟'
    ]
};

// Static leaderboard
const leaderboard = [
    { id: 1, name: 'Wicked Wheaties', score: 0, members: ['Alex', 'Janelle O.', 'Jonathan', 'Larissa', 'Leanne'] },
    { id: 2, name: 'Artificially Intelligent', score: 0, members: ['Amy', 'Drew', 'Jim', 'Michelle', 'Matt E.'] },
    { id: 3, name: 'Falls to the Wall', score: 0, members: ['Emilie', 'Craig', 'Janel E.', 'Kate', 'Luis'] },
    { id: 4, name: 'Harvest Hustlers', score: 0, members: ['James', 'Kari', 'Ciera', 'Mallory', 'Toni'] },
    { id: 5, name: 'Not the Droids You\'re Looking For', score: 0, members: ['Lauren O.', 'Lara', 'Nate', 'Meagan', 'Mitch'] },
    { id: 6, name: 'Nutmeg Hustlers', score: 0, members: ['Lauren H.', 'Kevin', 'Shannon', 'Shane', 'Yovo'] }
];

const PostsContext = createContext();

export function PostsProvider({ children }) {
    // Simply provide the static data
    const value = {
        posts: [currentPost],
        leaderboard
    };

    return (
        <PostsContext.Provider value={value}>
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
