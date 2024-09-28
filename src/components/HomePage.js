import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ denominations }) => {
    return (
        <div>
            <h1>Welcome to FaithVerse</h1>
            <h2>Select a Denomination:</h2>
            <ul>
                {denominations.map((denomination) => (
                    <li key={denomination}>
                        <Link to={`/${denomination}`}>{denomination.charAt(0).toUpperCase() + denomination.slice(1)}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
