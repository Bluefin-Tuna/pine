import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/Users/ayushpai/Documents/GitHub/pine/frontend.pine/src/assets/pineroot-modified.png'; // Adjust the path to your logo
import './Entry.css';

export default function Entry() {
    const [paperName, setPaperName] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaperName(event.target.value);
    };

    const handleSendInput = async () => {
        const url = "http://127.0.0.1:5000/add";
        const data = { paper_name: paperName };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const jsonData = await response.json();
            navigate('/graph', { state: { metadata: jsonData } });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="entry-wrapper">
            <img src={logo} alt="Logo" className="entry-logo" />
            <h1 className="entry-title">Pineroot</h1>
            <h3 className="entry-subtitle">Explore research efficiently.</h3>
            <div className="inputDiv">
                <input
                    name="paperName"
                    className="paperInput"
                    placeholder="Enter Paper Name"
                    value={paperName}
                    onChange={handleChange}
                />
                <button className="inputButton" onClick={handleSendInput}>Continue</button>
            </div>
        </div>
    );
}
