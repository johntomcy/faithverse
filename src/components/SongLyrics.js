import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SongLyrics = () => {
  const { denomination, songId } = useParams();
  const [lyrics, setLyrics] = useState({});
  const [language, setLanguage] = useState(''); // Default language
  const [languages, setLanguages] = useState([]); // To store available languages

  useEffect(() => {
    const fetchLyrics = async () => {
      const url = `https://api.github.com/repos/johntomcy/faithverse/contents/denominations/${denomination}/songs/${songId}.json`;
      const token = process.env.REACT_APP_GITHUB_PAT;

      console.log('Fetching lyrics from:', url); // Log the URL

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

        console.log('Fetched lyrics:', parsedLyrics); // Log the fetched lyrics

        setLyrics(parsedLyrics);
        // Extract available languages from the lyrics
        const availableLanguages = Object.keys(parsedLyrics.lyrics);
        setLanguages(availableLanguages);
        // Set the default language to the first one in the list
        setLanguage(availableLanguages[0]);
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      }
    };

    fetchLyrics();
  }, [denomination, songId]);

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Check if the lyrics are loaded and the language is set
  if (!lyrics || !lyrics.lyrics || !lyrics.lyrics[language]) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`px-4 py-2 mx-2 ${language === lang ? 'bg-primary text-white' : 'bg-gray-300'}`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">{lyrics.title}</h2>
      <div>
        {Object.entries(lyrics.lyrics[language]).map(([paraKey, text], index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default SongLyrics;
