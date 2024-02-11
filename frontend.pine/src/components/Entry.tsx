import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Entry.css';

export default function Entry() {
    const [paperName, setPaperName] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaperName(event.target.value);
    };

    // Mark the function as async to use await
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
        
        // Navigate to Main and pass data through state after the response is received
        navigate('/graph', { state: { metadata: jsonData } });
      } catch (error) {
        console.error('Error:', error);
      }
    }

    return (
      <div className="entry-wrapper">
        <h1>Pineroot</h1>
        <h3>Explore research efficiently.</h3>
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
