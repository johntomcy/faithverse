import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SongsList = () => {
    const { denomination } = useParams();
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            const url = `https://api.github.com/repos/johntomcy/faithverse/contents/denominations/${denomination}/songs/songs.json`;
            const token = process.env.REACT_APP_GITHUB_PAT; // Add your PAT here

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
                const songsContent = atob(data.content);
                const songsData = JSON.parse(songsContent);

                if (songsData && Array.isArray(songsData.songs)) {
                    setSongs(songsData.songs);
                } else {
                    throw new Error('No songs found');
                }
            } catch (error) {
                setError('Error fetching songs: ' + error.message);
            }
        };

        fetchSongs();
    }, [denomination]);

    if (error) return <p>{error}</p>;
    if (!songs.length) return <p>Loading...</p>;

    return (
        <div>
            <h1>Songs List for {denomination.charAt(0).toUpperCase() + denomination.slice(1)}</h1>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <Link to={`/${denomination}/songs/${song.id}`}>{song.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongsList;
