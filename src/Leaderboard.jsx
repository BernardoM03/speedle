import React from 'react';

export default function Leaderboard({ entries = [], formatTime }) {

    const sortedEntries = [...entries].sort((a, b) => a.time - b.time);

    return (
        <table>
        <thead>
            <tr>
            <th>rank</th>
            <th>username</th>
            <th>time</th>
            <th>date recorded</th>
            </tr>
        </thead>
        <tbody>
            {sortedEntries.slice(0, 100).map((entry, index) => (
            <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{entry.username}</td>
                <td>{formatTime(entry.time)}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}
