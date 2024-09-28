import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DenominationDetail = () => {
    const { denomination } = useParams();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Welcome to {denomination.charAt(0).toUpperCase() + denomination.slice(1)} Denomination
            </h1>
            <p className="mb-4">Here, you can explore various resources related to the {denomination} denomination.</p>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Available Options:</h2>
                <ul className="list-disc list-inside">
                    <li>
                        <Link to={`/${denomination}/songs`} className="text-blue-500 hover:underline">
                            Songs
                        </Link>
                    </li>
                    <li>
                        <Link to={`/${denomination}/prayers`} className="text-blue-500 hover:underline">
                            Prayers
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="mb-4">
                <Link
                    to="/"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default DenominationDetail;
