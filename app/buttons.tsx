"use client"; // Mark this component as a Client Component

import React from 'react';
import './buttons.css'; // Import the external CSS file

export default function Buttons() {
    const openYouTube = () => {
        window.open('https://www.youtube.com', '_blank');
        setClicked(true); // Disable button after clicking
    };

    return (
        <div>
            <h1>Basic Buttons</h1>
            <button onClick={openYouTube} disabled={clicked}>
                {clicked ? "Clicked" : "Button 1"}
            </button>
            <button>Button 2</button>
            <button>Button 3</button>
            <button>Button 4</button>
        </div>
    );
}
