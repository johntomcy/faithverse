// src/components/SongList.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function SongList() {
  const { denomination } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set loading to true when fetching starts
    setLoading(true);
    fetch(`https://raw.githubusercontent.com/johntomcy/faithverse/main/denominations/${denomination}/songs/songs.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSongs(data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false); // Set loading to false on error
      });
  }, [denomination]);

  if (loading) return <div>Loading songs...</div>;
  if (error) return <div>Error loading songs: {error}</div>;

  return (
    <div>
      <h2>{denomination} Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <Link to={`/songs/${denomination}/${song.id}`}>{song.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
