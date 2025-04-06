import React from 'react';

export default function Records({ entries = [], formatTime, onDelete }) {
    const sortedEntries = [...entries].sort((a, b) => a.time - b.time);

    return (
        <table>
        <thead>
            <tr>
            <th>rank</th>
            <th>time</th>
            <th>date recorded</th>
            <th>delete?</th>
            </tr>
        </thead>
        <tbody>
            {sortedEntries.slice(0, 100).map((entry, index) => (
            <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{formatTime(entry.time)}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>
                    <button className="delete-record-button" onClick={() => onDelete(entry._id)}>Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}
