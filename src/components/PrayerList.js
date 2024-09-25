import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PrayerList({ denomination }) {
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/johntomcy/faithverse/main/denominations/${denomination}/prayers/prayers.json`)
      .then((response) => response.json())
      .then((data) => setPrayers(data.prayers));
  }, [denomination]);

  if (!prayers.length) {
    return <div>Loading prayers...</div>;
  }

  return (
    <div>
      <h1>Prayers</h1>
      <ul>
        {prayers.map((prayer) => (
          <li key={prayer.id}>
            <Link to={`/prayers/${denomination}/${prayer.id}`}>{prayer.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrayerList;
