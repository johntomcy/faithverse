import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Home page component
import DenominationDetail from './components/DenominationDetail'; // Denomination detail page
import SongList from './components/SongList'; // Songs listing page
import PrayerList from './components/PrayerList'; // Prayers listing page
import SongLyrics from './components/SongLyrics'; // Specific song's lyrics
import PrayerDetails from './components/PrayerDetails'; // Specific prayer's details
import Header from './components/Header'; // Header component
import About from './components/About'; // Import the About component

const App = () => {
    // Sample denominations list
    const denominations = ['catholic', 'orthodox', 'protestant'];

    return (
        <div>
            {/* Include Header on all pages */}
            <Header />

            {/* Define Routes */}
            <Routes>
                {/* Home Page: Pass denominations to the homepage */}
                <Route path="/" element={<HomePage denominations={denominations} />} />
                
                {/* Denomination Detail Page */}
                <Route path="/:denomination" element={<DenominationDetail />} />
                
                {/* Songs Page: List of songs for the selected denomination */}
                <Route path="/:denomination/songs" element={<SongList />} />
                
                {/* Prayers Page: List of prayers for the selected denomination */}
                <Route path="/:denomination/prayers" element={<PrayerList />} />
                
                {/* Song Lyrics Page: Display lyrics for a specific song */}
                <Route path="/:denomination/songs/:songId" element={<SongLyrics />} />
                
                {/* Prayer Details Page: Display details for a specific prayer */}
                <Route path="/:denomination/prayers/:prayerId" element={<PrayerDetails />} />

                <Route path="/about" element={<About />} /> {/* Added About route */}
            </Routes>
        </div>
    );
};

export default App;
