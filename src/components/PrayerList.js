import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PrayersList = () => {
    const { denomination } = useParams();
    const [prayers, setPrayers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrayers = async () => {
            const url = `https://api.github.com/repos/johntomcy/faithverse/contents/denominations/${denomination}/prayers/prayers.json`;
            const token = process.env.REACT_APP_GITHUB_PAT; // Add your PAT here

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
                const prayersContent = atob(data.content);
                const prayersData = JSON.parse(prayersContent);

                if (prayersData && Array.isArray(prayersData.prayers)) {
                    setPrayers(prayersData.prayers);
                } else {
                    throw new Error('No prayers found');
                }
            } catch (error) {
                setError('Error fetching prayers: ' + error.message);
            }
        };

        fetchPrayers();
    }, [denomination]);

    if (error) return <p>{error}</p>;
    if (!prayers.length) return <p>Loading...</p>;

    return (
        <div>
            <h1>Prayers List for {denomination.charAt(0).toUpperCase() + denomination.slice(1)}</h1>
            <ul>
                {prayers.map((prayer) => (
                    <li key={prayer.id}>{prayer.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PrayersList;
