"use client"; // Mark this component as a Client Component

import React from 'react';

export default function Buttons() {
    return (
        <div>
            <h1>Basic Buttons</h1>
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
            <button>Button 4</button>

            <style jsx>{`
                button {
                    padding: 10px 20px;
                    margin: 10px;
                    background-color: lightblue;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: blue;
                    color: white;
                }
            `}</style>
        </div>
    );
}