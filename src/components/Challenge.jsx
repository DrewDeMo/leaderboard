import { useEffect, useState } from 'react';

export default function Challenge() {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

    useEffect(() => {
        // Add timestamp to URL to prevent caching
        const timestamp = new Date().getTime();
        fetch(`/data/challenges.json?t=${timestamp}`)
            .then(response => {
                // Force cache revalidation
                const fresh = response.clone();
                caches.delete('/data/challenges.json').then(() => {
                    return fresh;
                });
                return response;
            })
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

    const goToNextChallenge = () => {
        if (currentChallengeIndex < challenges.length - 1) {
            setCurrentChallengeIndex(currentChallengeIndex + 1);
        }
    };

    const goToPreviousChallenge = () => {
        if (currentChallengeIndex > 0) {
            setCurrentChallengeIndex(currentChallengeIndex - 1);
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading challenges...</div>;
    }

    if (!challenges.length) {
        return <div className="text-center p-4">No active challenges</div>;
    }

    const currentChallenge = challenges[currentChallengeIndex];

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={goToPreviousChallenge}
                        className={`text-2xl px-4 py-2 rounded ${currentChallengeIndex === 0
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-blue-500 hover:bg-blue-100'
                            }`}
                        disabled={currentChallengeIndex === 0}
                    >
                        ←
                    </button>
                    <h2 className="text-2xl font-bold">
                        Day {currentChallenge.id}: {currentChallenge.title} {currentChallenge.emoji}
                    </h2>
                    <button
                        onClick={goToNextChallenge}
                        className={`text-2xl px-4 py-2 rounded ${currentChallengeIndex === challenges.length - 1
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-blue-500 hover:bg-blue-100'
                            }`}
                        disabled={currentChallengeIndex === challenges.length - 1}
                    >
                        →
                    </button>
                </div>

                <div className="whitespace-pre-wrap mb-4">{currentChallenge.description}</div>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Submission Requirements:</h3>
                    <ul className="list-disc pl-6">
                        {currentChallenge.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Bonus Point Opportunities:</h3>
                    <ul className="list-disc pl-6">
                        {currentChallenge.bonusPoints.map((bonus, index) => (
                            <li key={index}>
                                {bonus.description} for an additional {bonus.points} points
                            </li>
                        ))}
                    </ul>
                </div>

                {currentChallenge.notes && currentChallenge.notes.length > 0 && (
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Note:</h3>
                        {currentChallenge.notes.map((note, index) => (
                            <p key={index}>{note}</p>
                        ))}
                    </div>
                )}

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">
                        Submissions are due by {currentChallenge.dueTime}. Happy snapping! 🍁🌟
                    </p>
                </div>
            </div>
        </div>
    );
}
