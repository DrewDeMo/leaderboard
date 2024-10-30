import React, { createContext, useContext, useState } from 'react';

// Static posts array with both challenges - newest first
const staticPosts = [
    {
        id: 3,
        title: 'Day 3: "Autumn Playlist Challenge" 🎶🍁',
        author: 'Danielle',
        date: '2024/10/30',
        difficulty: 'Medium',
        time: '30 minutes',
        description: 'Hello, Music Lovers!\n\nToday\'s challenge is all about curating the perfect autumn playlist! Each team member should select a song that reminds them of fall or brings back a special fall memory—like a song played during a Thanksgiving dinner, a cozy autumn gathering, or one that just captures the feeling of the season. Work together to create a cohesive playlist.',
        notes: [
            '🎃 Last Chance to Vote for Your Favorite Pumpkin! 🌟\nHello, Team!\n\nJust a friendly reminder that today is the last day to vote for your favorite pumpkin!  Please submit your votes by 5 PM EST. Your participation has been amazing, and I appreciate everyone\'s creativity and effort in this contest!\n\nThank you all for making this so much fun!  Let\'s see which pumpkin reigns supreme!\n\nFestively,\nDanielle'
        ],
        requirements: [
            'Your team\'s name must be included in your submission',
            'Your team\'s nominated captain must post the playlist'
        ],
        bonusPoints: [
            {
                description: 'Include a short description explaining why each song was chosen',
                points: 5
            },
            {
                description: 'Add a verse or lyric that resonates with one of your chosen songs',
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
    { id: 1, name: 'Cereal Killers', score: 190, members: ['Alex', 'Janelle O.', 'Jonathan', 'Larissa', 'Leanne'] },
    { id: 2, name: 'Artificially Intelligent', score: 165, members: ['Amy', 'Drew', 'Jim', 'Michelle', 'Matt E.'] },
    { id: 5, name: 'Not the Droids You\'re Looking For', score: 158, members: ['Lauren O.', 'Lara', 'Nate', 'Meagan', 'Mitch'] },
    { id: 4, name: 'Harvest Hustlers', score: 147, members: ['James', 'Kari', 'Ciera', 'Mallory', 'Toni'] },
    { id: 3, name: 'Falls to the Wall', score: 110, members: ['Emilie', 'Craig', 'Janel E.', 'Kate', 'Luis'] },
    { id: 6, name: 'Nutmeg Hustlers', score: 101, members: ['Lauren H.', 'Kevin', 'Shannon', 'Shane', 'Yovo'] }
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
