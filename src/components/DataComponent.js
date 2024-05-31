import React, { useState, useEffect } from 'react';

function DataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data:</h1>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            <strong>Title:</strong> {item.title} <br />
            <strong>Published:</strong> {item.published} <br />
            <strong>Source:</strong> {item.source} <br />
            <strong>URL:</strong> <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a> <br />
            <strong>End Year:</strong> {item.end_year || 'N/A'} <br />
            <strong>Topic:</strong> {item.topic} <br />
            <strong>Sector:</strong> {item.sector} <br />
            <strong>Region:</strong> {item.region} <br />
            <strong>Pestle:</strong> {item.pestle} <br />
            <strong>SWOT:</strong> {item.swot || 'N/A'} <br />
            <strong>Country:</strong> {item.country} <br />
            <strong>City:</strong> {item.city || 'N/A'} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataComponent;
