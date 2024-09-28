import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PrayerList = () => {
  const { denomination } = useParams();
  const [prayers, setPrayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayers = async () => {
      const url = `https://api.github.com/repos/johntomcy/faithverse/contents/denominations/${denomination}/prayers/prayers.json`;
      const token = process.env.REACT_APP_GITHUB_PAT;

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

  if (error) return <p className="text-red-600">{error}</p>;
  if (!prayers.length) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Prayers List for {denomination.charAt(0).toUpperCase() + denomination.slice(1)}
      </h1>
      <ul className="list-disc pl-6">
        {prayers.map((prayer) => (
          <li key={prayer.id} className="my-2">
            <Link to={`/${denomination}/prayers/${prayer.id}`} className="text-blue-600 hover:underline">
              {prayer.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrayerList;
