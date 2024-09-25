// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongList from './components/SongList';
import SongLyrics from './components/SongLyrics';
import PrayerList from './components/PrayerList';
import PrayerDetails from './components/PrayerDetails';

function App() {
  return (
    <Router>
      <div>
        <h1>FaithVerse</h1> {/* Add a simple header to test if it's rendering */}
        <Routes>
          <Route path="/" element={<SongList />} />
          <Route path="/songs/:denomination" element={<SongList />} />
          <Route path="/songs/:denomination/:songId" element={<SongLyrics />} />
          <Route path="/prayers/:denomination" element={<PrayerList />} />
          <Route path="/prayers/:denomination/:prayerId" element={<PrayerDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
