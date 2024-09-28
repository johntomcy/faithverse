import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <Link to="/" className="text-xl font-bold">FaithVerse</Link> {/* Make the title clickable */}
            <button onClick={toggleMenu} className="md:hidden focus:outline-none">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    )}
                </svg>
            </button>
            <nav className={`absolute top-0 right-0 h-full bg-gray-800 text-white transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:flex md:items-center md:transform-none`}>
                <ul className="flex flex-col md:flex-row md:space-x-4 p-4 md:p-0">
                    <li>
                        <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="block py-2 px-4 hover:bg-gray-700 rounded">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
