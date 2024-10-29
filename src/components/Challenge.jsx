import { useEffect, useState } from 'react';

export default function Challenge() {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/challenges.json')
            .then(response => response.json())
            .then(data => {
                setChallenges(data.challenges);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading challenges:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading challenges...</div>;
    }

    if (!challenges.length) {
        return <div className="text-center p-4">No active challenges</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {challenges.map(challenge => (
                <div key={challenge.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                        Day {challenge.id}: {challenge.title} {challenge.emoji}
                    </h2>

                    <div className="whitespace-pre-wrap mb-4">{challenge.description}</div>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Submission Requirements:</h3>
                        <ul className="list-disc pl-6">
                            {challenge.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Bonus Point Opportunities:</h3>
                        <ul className="list-disc pl-6">
                            {challenge.bonusPoints.map((bonus, index) => (
                                <li key={index}>
                                    {bonus.description} for an additional {bonus.points} points
                                </li>
                            ))}
                        </ul>
                    </div>

                    {challenge.notes && challenge.notes.length > 0 && (
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Note:</h3>
                            {challenge.notes.map((note, index) => (
                                <p key={index}>{note}</p>
                            ))}
                        </div>
                    )}

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold">
                            Submissions are due by {challenge.dueTime}. Happy snapping! 🍁🌟
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
