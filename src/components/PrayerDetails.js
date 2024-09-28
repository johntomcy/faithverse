import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PrayerDetails = () => {
    const { denomination, prayerId } = useParams();
    const [prayer, setPrayer] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrayer = async () => {
            const url = `https://api.github.com/repos/johntomcy/faithverse/contents/denominations/${denomination}/prayers/${prayerId}.json`;
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
                const prayerContent = atob(data.content);
                const prayerData = JSON.parse(prayerContent);
                setPrayer(prayerData); // Assuming prayerData has the relevant structure
            } catch (error) {
                setError('Error fetching prayer: ' + error.message);
            }
        };

        fetchPrayer();
    }, [denomination, prayerId]);

    if (error) return <p>{error}</p>;
    if (!prayer.title) return <p>Loading...</p>;

    return (
        <div>
            <h1>{prayer.title}</h1>
            <p>{prayer.content}</p> {/* Assuming prayer content is a simple text */}
        </div>
    );
};

export default PrayerDetails;
