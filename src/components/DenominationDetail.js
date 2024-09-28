import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DenominationDetail = () => {
    const { denomination } = useParams();

    return (
        <div>
            <h1>{denomination.charAt(0).toUpperCase() + denomination.slice(1)} Denomination</h1>
            <h2>Links:</h2>
            <ul>
                <li>
                    <Link to={`/${denomination}/songs`}>Songs</Link>
                </li>
                <li>
                    <Link to={`/${denomination}/prayers`}>Prayers</Link>
                </li>
            </ul>
        </div>
    );
};

export default DenominationDetail;
