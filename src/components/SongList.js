import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SongList = ({ denomination }) => {
    const [songs, setSongs] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            const url = `https://api.github.com/repos/johntomcy/faithverse/contents/denominations/${denomination}/songs/songs.json`;
            const token = process.env.GITHUB_PAT;

            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const songsContent = atob(data.content); // Decode base64 content

                let songsData;
                try {
                    songsData = JSON.parse(songsContent); // Parse JSON content
                } catch (e) {
                    throw new Error('Failed to parse songs JSON');
                }

                // Access the songs array inside the songs object
                if (songsData && Array.isArray(songsData.songs)) {
                    setSongs(songsData.songs); // Set the songs array
                } else {
                    throw new Error('Fetched data does not contain songs array');
                }
            } catch (error) {
                setError('Error fetching songs: ' + error.message);
            }
        };

        fetchSongs();
    }, [denomination]);

    return (
        <div>
            <h1>Song List</h1>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <Link to={`/songs/${denomination}/${song.id}`}>{song.title}</Link> {/* Link to song lyrics */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;
