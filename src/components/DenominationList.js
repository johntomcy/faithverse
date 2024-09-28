import React from 'react';
import { Link } from 'react-router-dom';

const DenominationList = () => {
  const denominations = ['Catholic', 'Orthodox', 'Protestant'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to FaithVerse</h1>
      <p className="text-lg mb-4">Select a Denomination:</p>
      <ul className="list-disc pl-6">
        {denominations.map((denomination) => (
          <li key={denomination} className="my-2">
            <Link to={`/${denomination.toLowerCase()}/songs`} className="text-blue-600 hover:underline">
              {denomination}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DenominationList;
