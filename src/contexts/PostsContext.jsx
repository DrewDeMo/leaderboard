import React, { createContext, useContext, useState } from 'react';

// Static posts array with both challenges - newest first
const staticPosts = [
    {
        id: 2,
        title: 'Day 2: "Halloween Costume Memories" 🎃👻',
        author: 'Danielle',
        date: '2024/10/29',
        difficulty: 'Medium',
        time: '30 minutes',
        description: 'Hello, Halloween Enthusiasts!\n\nFor today\'s challenge, each team member will submit an image representing their favorite Halloween costume. This image doesn\'t have to be a personal photo, but personal photos will earn bonus Bravery Points!\n\nEach team member must submit an image, and the team will compile these into a collage, adding a short description of why the chosen costume is their favorite.',
        notes: [
            'Keep an eye out—I\'ll be sending out the pumpkin contest survey shortly! You\'ll have until tomorrow, Wednesday, October 30th, by close of business to vote for your favorite pumpkin. Only one vote per person will be allowed, and all responses after the deadline won\'t be counted. The winner will be announced at the happy hour on Friday!'
        ],
        requirements: [
            'Your team\'s name must be included in your submission',
            'Your team\'s nominated captain must post the collage'
        ],
        bonusPoints: [
            {
                description: 'Personal photos of your favorite Halloween costumes',
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
        description: 'Hello, Scavenger Hunt Teams!\n\nTo kick off our scavenger hunt, each team member will need to find and photograph a unique item that embodies the essence of fall. Once everyone has their photos, the team can work together to compile them into a collage representing your team\'s autumn adventure.',
        notes: [
            'I\'ll be sending out the link to the leaderboard later today so you can track your progress throughout the week!'
        ],
        requirements: [
            'Ensure your team\'s name is included in your submission',
            'To receive full points, your team\'s nominated captain must post the collage in the Microsoft Teams General channel'
        ],
        bonusPoints: [
            {
                description: 'Include a fun fall fact about one of the items in your collage',
                points: 5
            },
            {
                description: 'Create a unique caption (one per team member)',
                points: 5
            }
        ],
        dueTime: '5:00 PM EST'
    }
];

// Static leaderboard
const leaderboard = [
    { id: 4, name: 'Harvest Hustlers', score: 41, members: ['James', 'Kari', 'Ciera', 'Mallory', 'Toni'] },
    { id: 1, name: 'Cereal Killers', score: 40, members: ['Alex', 'Janelle O.', 'Jonathan', 'Larissa', 'Leanne'] },
    { id: 2, name: 'Artificially Intelligent', score: 40, members: ['Amy', 'Drew', 'Jim', 'Michelle', 'Matt E.'] },
    { id: 3, name: 'Falls to the Wall', score: 39, members: ['Emilie', 'Craig', 'Janel E.', 'Kate', 'Luis'] },
    { id: 5, name: 'Not the Droids You\'re Looking For', score: 39, members: ['Lauren O.', 'Lara', 'Nate', 'Meagan', 'Mitch'] },
    { id: 6, name: 'Nutmeg Hustlers', score: 34, members: ['Lauren H.', 'Kevin', 'Shannon', 'Shane', 'Yovo'] }
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
