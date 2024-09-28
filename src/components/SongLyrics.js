import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SongLyrics = () => {
  const { denomination, songId } = useParams();
  const [songData, setSongData] = useState({});
  const [language, setLanguage] = useState('english'); // Default language

  const languages = ['english', 'malayalam', 'manglish'];

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
        const parsedLyrics = JSON.parse(lyricsContent);
        // console.log('Fetched lyrics:', parsedLyrics); // Check the fetched data
        setSongData(parsedLyrics);
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    };

    fetchLyrics();
  }, [denomination, songId]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Loading state
  if (!songData || Object.keys(songData).length === 0) return <p>Loading...</p>;

  // Access the lyrics based on the selected language
  const lyrics = songData.lyrics[language];

  // Check if lyrics for the selected language are available
  if (!lyrics) return <p>No lyrics available for this language.</p>;

  return (
    <div className="p-6">
      <div className="mb-4">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`px-4 py-2 mx-2 ${
              language === lang ? 'bg-primary text-white' : 'bg-gray-300 text-black'
            } transition duration-200 ease-in-out`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">{songData.title}</h2>
      {/* Display the lyrics paragraph by paragraph */}
      {Object.keys(lyrics).map((paraKey) => (
        <p key={paraKey}>{lyrics[paraKey]}</p>
      ))}
    </div>
  );
};

export default SongLyrics;
