import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Import HomePage
import DenominationDetail from './components/DenominationDetail';
import SongList from './components/SongList'; // Updated component import
import PrayerList from './components/PrayerList'; // Updated import for PrayerList
import SongLyrics from './components/SongLyrics'; 
import PrayerDetails from './components/PrayerDetails'; 

const App = () => {
    // Sample denominations list; replace with your actual list if available
    const denominations = ['catholic', 'orthodox', 'protestant']; 

    return (
        <Routes>
            <Route path="/" element={<HomePage denominations={denominations} />} /> {/* Pass denominations to HomePage */}
            <Route path="/:denomination" element={<DenominationDetail />} />
            <Route path="/:denomination/songs" element={<SongList />} /> {/* Changed to SongList */}
            <Route path="/:denomination/prayers" element={<PrayerList />} /> {/* Changed to PrayerList */}
            <Route path="/:denomination/songs/:songId" element={<SongLyrics />} />
            <Route path="/:denomination/prayers/:prayerId" element={<PrayerDetails />} />
        </Routes>
    );
};

export default App;
