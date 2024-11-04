import React, { createContext, useContext, useState } from 'react';

// Static posts array with both challenges - newest first
const staticPosts = [
    {
        id: 4,
        title: 'Day 4: "Autumn Enigma Challenge" 🎃🔍',
        author: 'Danielle',
        date: '2024/10/31',
        difficulty: 'Hard',
        time: '45 minutes',
        description: 'The grand finale—a multi-layered puzzle that called for teamwork and quick thinking! Teams worked together to solve riddles and unlock the next clues.',
        notes: [],
        requirements: ['Team captains submitted answers via direct message'],
        bonusPoints: [
            {
                description: 'Solved the first riddle within 10 minutes',
                points: 10
            }
        ],
        dueTime: '5:00 PM EST'
    },
    {
        id: 3,
        title: 'Day 3: "Autumn Playlist Challenge" 🎶🍁',
        author: 'Danielle',
        date: '2024/10/30',
        difficulty: 'Medium',
        time: '30 minutes',
        description: 'Teams curated the perfect autumn playlist with each member selecting a song that reminded them of fall or brought back a special fall memory.',
        notes: [],
        requirements: ['Team submissions included song selections and descriptions'],
        bonusPoints: [
            {
                description: 'Included descriptions for song choices',
                points: 5
            }
        ],
        dueTime: '5:00 PM EST'
    },
    {
        id: 2,
        title: 'Day 2: "Halloween Costume Memories" 🎃👻',
        author: 'Danielle',
        date: '2024/10/29',
        difficulty: 'Medium',
        time: '30 minutes',
        description: 'Teams shared their favorite Halloween costumes, creating a collage of memories and stories that showcased their creativity and spirit.',
        notes: [],
        requirements: ['Teams submitted costume collages with descriptions'],
        bonusPoints: [
            {
                description: 'Personal photos of Halloween costumes',
                points: 5
            }
        ],
        dueTime: '5:00 PM EST'
    },
    {
        id: 1,
        title: 'Day 1: "Autumn Adventure Photo Challenge" 📸🍂',
        author: 'Danielle',
        date: '2024/10/28',
        difficulty: 'Medium',
        time: '30 minutes',
        description: 'Teams captured the essence of fall through photography, with each member finding and photographing unique autumn items for a team collage.',
        notes: [],
        requirements: ['Teams submitted photo collages representing autumn'],
        bonusPoints: [
            {
                description: 'Included fun fall facts about items',
                points: 5
            }
        ],
        dueTime: '5:00 PM EST'
    }
];

// Static leaderboard
// Note: Teams must be ordered by score from highest to lowest
const leaderboard = [
    { id: 1, name: 'Cereal Killers', score: 379, members: ['Alex', 'Janelle O.', 'Jonathan', 'Larissa', 'Leanne'] },
    { id: 2, name: 'Artificially Intelligent', score: 369, members: ['Amy', 'Drew', 'Jim', 'Michelle', 'Matt E.'] },
    { id: 3, name: 'Falls to the Wall', score: 343, members: ['Emilie', 'Craig', 'Janel E.', 'Kate', 'Luis'] },
    { id: 5, name: 'Not the Droids You\'re Looking For', score: 326, members: ['Lauren O.', 'Lara', 'Nate', 'Meagan', 'Mitch'] },
    { id: 4, name: 'Harvest Hustlers', score: 243, members: ['James', 'Kari', 'Ciera', 'Mallory', 'Toni'] },
    { id: 6, name: 'Nutmeg Hustlers', score: 235, members: ['Lauren H.', 'Kevin', 'Shannon', 'Shane', 'Yovo'] }
];

const PostsContext = createContext();

export function PostsProvider({ children }) {
    const [currentPostIndex, setCurrentPostIndex] = useState(0);

    const value = {
        posts: staticPosts,
        currentPostIndex,
        setCurrentPostIndex,
        leaderboard,
        totalPosts: staticPosts.length
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
