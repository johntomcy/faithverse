import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SongLyrics.css'; // Import the CSS file for styling

const SongLyrics = () => {
    const { denomination, songId } = useParams();
    const [lyrics, setLyrics] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('manglish'); // Default to Manglish
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLyrics = async () => {
            const url = `https://api.github.com/repos/johntomcy/faithverse/contents/denominations/${denomination}/songs/${songId}.json`;
            // const token = process.env.REACT_APP_GITHUB_PAT;  
            const token = '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';
            // console.log("token--->"+token);

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
                const lyricsContent = atob(data.content); // Decode base64 content
                const parsedLyrics = JSON.parse(lyricsContent); // Parse the JSON

                setLyrics(parsedLyrics); // Set the lyrics content
            } catch (error) {
                setError('Error fetching lyrics: ' + error.message);
            }
        };

        fetchLyrics();
    }, [denomination, songId]);

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {lyrics ? (
                <>
                    <h1>{lyrics.title}</h1>
                    <div>
                        <h2>Select Language:</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleLanguageChange('english')}>English</button>
                            <button onClick={() => handleLanguageChange('malayalam')}>Malayalam</button>
                            <button onClick={() => handleLanguageChange('manglish')}>Manglish</button>
                        </div>
                    </div>
                    {lyrics.lyrics && lyrics.lyrics[selectedLanguage] ? (
                        <div>
                            <h2>{selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Lyrics:</h2>
                            {Object.entries(lyrics.lyrics[selectedLanguage]).map(([key, value]) => (
                                <p key={key} className={selectedLanguage === 'malayalam' ? 'malayalam-text' : ''}>
                                    {value}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p>No lyrics available for {selectedLanguage}.</p>
                    )}
                </>
            ) : (
                <p>Loading lyrics...</p>
            )}
        </div>
    );
};

export default SongLyrics;
