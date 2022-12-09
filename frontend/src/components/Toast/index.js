import React, { useState } from 'react';
import "./style.css";

export default function Toast({props}) {
    console.log("prips:", JSON.stringify(props));
    const [isClicked, setClicked] = useState(false);
    return (
        <div className={`toast ${props[0].classname} ${isClicked ? "hide" : ""}`}>
            <button onClick={() => setClicked(true)}>Close</button>
            <p className="description">{props[0].description}</p>
        </div>
    )
}
