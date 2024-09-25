import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PrayerDetails() {
  const { denomination, prayerId } = useParams();
  const [prayer, setPrayer] = useState(null);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/johntomcy/faithverse/main/denominations/${denomination}/prayers/${prayerId}.json`)
      .then((response) => response.json())
      .then((data) => setPrayer(data));
  }, [denomination, prayerId]);

  if (!prayer) {
    return <div>Loading prayer...</div>;
  }

  return (
    <div>
      <h1>{prayer.title}</h1>
      <div>
        <h2>English</h2>
        <p>{prayer.prayer.english.para1}</p>
        <p>{prayer.prayer.english.para2}</p>
        <h2>Malayalam</h2>
        <p>{prayer.prayer.malayalam.para1}</p>
        <p>{prayer.prayer.malayalam.para2}</p>
        <h2>Manglish</h2>
        <p>{prayer.prayer.manglish.para1}</p>
        <p>{prayer.prayer.manglish.para2}</p>
      </div>
    </div>
  );
}

export default PrayerDetails;
