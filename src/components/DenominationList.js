import React from 'react';
import { Link } from 'react-router-dom';

const DenominationList = () => {
    const denominations = [
        { name: 'Catholic', id: 'catholic' },
        { name: 'Orthodox', id: 'orthodox' },
        { name: 'Protestant', id: 'protestant' },
        // Add more denominations as needed
    ];

    return (
        <div>
            <h1>Denominations</h1>
            <ul>
                {denominations.map((denomination) => (
                    <li key={denomination.id}>
                        <Link to={`/${denomination.id}`}>{denomination.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DenominationList;
