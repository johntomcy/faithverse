// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ denominations }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to FaithVerse</h1>
      <h2 className="text-2xl mb-4">Select a Denomination:</h2>
      <ul className="space-y-2">
        {denominations.map((denomination) => (
          <li key={denomination}>
            <Link 
              to={`/${denomination}`} 
              className="text-blue-500 hover:underline"
            >
              {denomination.charAt(0).toUpperCase() + denomination.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
