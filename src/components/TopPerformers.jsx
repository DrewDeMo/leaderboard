import React from 'react';
import { usePosts } from '../contexts/PostsContext';

const TopPerformers = () => {
    const { leaderboard } = usePosts();

    // Sort and get top 3 teams
    const topTeams = [...leaderboard]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Top Performers</h2>
            <div className="space-y-3">
                {topTeams.map((team, index) => (
                    <div
                        key={team.id}
                        className="flex items-center justify-between p-2 rounded"
                        style={{
                            backgroundColor: index === 0 ? '#ffd700' :
                                index === 1 ? '#c0c0c0' :
                                    index === 2 ? '#cd7f32' : 'transparent',
                            opacity: 0.2 + ((3 - index) * 0.3)
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-700">
                                {index + 1}.
                            </span>
                            <span className="text-gray-800">{team.name}</span>
                        </div>
                        <span className="font-semibold text-gray-700">
                            {team.score} pts
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPerformers;
