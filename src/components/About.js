import React from 'react';

const About = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">About FaithVerse</h1>
            <p className="mb-4">
                FaithVerse is a platform dedicated to providing easy access to Christian songs, prayers, and resources tailored to different denominations. Our mission is to create a unified space for believers to engage with their faith through music and prayer.
            </p>
            <p className="mb-4">
                Whether you are Catholic, Orthodox, or Protestant, FaithVerse aims to enhance your spiritual journey by offering a rich selection of songs and prayers in multiple languages.
            </p>
            <h2 className="text-xl font-bold mt-6 mb-2">Our Features:</h2>
            <ul className="list-disc ml-6">
                <li>Access to a wide variety of Christian songs</li>
                <li>Prayers for different occasions</li>
                <li>Support for multiple languages: English, Malayalam, and Manglish</li>
                <li>Community-driven content and contributions</li>
            </ul>
            <h2 className="text-xl font-bold mt-6 mb-2">Get Involved:</h2>
            <p>
                Join us in enriching the Christian community! You can contribute by sharing your favorite songs and prayers, and helping us grow this platform together.
            </p>
        </div>
    );
};

export default About;
