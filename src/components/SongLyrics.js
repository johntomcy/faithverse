import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SongLyrics = () => {
    const { denomination, songId } = useParams(); // Extract denomination and songId from URL
    const [lyrics, setLyrics] = useState(null);
    const [error, setError] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('manglish'); // Default to Manglish

    useEffect(() => {
        const fetchLyrics = async () => {
            const url = `https://api.github.com/repos/johntomcy/faithverse/contents/denominations/${denomination}/songs/${songId}.json`;
            const token = process.env.REACT_APP_GITHUB_PAT;

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
                const lyricsContent = atob(data.content);
                const lyricsData = JSON.parse(lyricsContent);

                setLyrics(lyricsData);
            } catch (error) {
                setError('Error fetching lyrics: ' + error.message);
            }
        };

        fetchLyrics();
    }, [denomination, songId]);

    if (error) return <p>{error}</p>;
    if (!lyrics) return <p>Loading...</p>;

    // Function to handle language change
    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <div>
            <h1>{lyrics.title}</h1>
            <div style={{ marginBottom: '20px' }}>
                {/* Language buttons */}
                {Object.keys(lyrics.lyrics).map((language) => (
                    <button 
                        key={language} 
                        onClick={() => handleLanguageChange(language)} 
                        style={{ marginRight: '10px' }}
                    >
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                    </button>
                ))}
            </div>
            <h2>{selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Lyrics:</h2>
            {/* Render the lyrics based on the selected language */}
            {Object.entries(lyrics.lyrics[selectedLanguage]).map(([key, value]) => (
                <p key={key}>{value}</p>
            ))}
        </div>
    );
};

export default SongLyrics;
