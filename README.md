
To create the data visualization dashboard as per the assignment requirements, follow these steps:

### Step 1: Set Up the Project
1. **Initialize a new React project** using Create React App or a similar setup.
    ```bash
    npx create-react-app data-visualization-dashboard
    cd data-visualization-dashboard
    ```
2. **Install necessary libraries** such as `D3.js` for charts, `Mongoose` for the schema, and any other libraries you might need.
    ```bash
    npm install d3 mongoose
    ```
2. **Install axios** .
    ```bash
    npm install axios
    ```

### Step 2: Define the Data Schema
Create a file to define your data schema using Mongoose. For example, `dataSchema.js`:
```javascript
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: { type: Date, default: Date.now },
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
});

module.exports = mongoose.model('Data', dataSchema);
```

### Step 3: Fetch Data from API
Assume that the API provides data matching the schema. Create a service to fetch data from the API.

```javascript
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchData;
```

### Step 4: Build the Dashboard
Create the main dashboard component. Use D3.js or other chart libraries to visualize the data. Add filters to the dashboard to allow users to filter the data based on various criteria.

```javascript
import React, { useEffect, useState } from 'react';
import fetchData from './fetchData';
import * as d3 from 'd3';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setData(data);
    };
    getData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredData = data.filter(item => {
    return Object.keys(filters).every(key => {
      return filters[key] === '' || item[key] === filters[key];
    });
  });

  useEffect(() => {
    if (data.length > 0) {
      // Example D3 code to create a chart
      const svg = d3.select('svg');
      svg.selectAll('*').remove();
      
      svg.append('g')
        .selectAll('circle')
        .data(filteredData)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => i * 10)
        .attr('cy', 50)
        .attr('r', 5);
    }
  }, [data, filters]);

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <div>
        <label>End Year:</label>
        <input type="text" name="endYear" value={filters.endYear} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Topic:</label>
        <input type="text" name="topic" value={filters.topic} onChange={handleFilterChange} />
      </div>
      {/* Add more filters similarly */}
      <svg width="800" height="600"></svg>
    </div>
  );
};

export default Dashboard;
```

### Step 5: Add More Visualizations and Interactivity
1. **Enhance the visualizations** by adding more D3.js charts or other libraries like Chart.js, Recharts, etc.
2. **Add more interactive elements** such as tooltips, zoom, and pan for charts.
3. **Implement additional filters** and ensure they dynamically update the visualizations.

### Step 6: Finalize and Test
1. **Test the dashboard** to ensure it works correctly with all the filters and visualizations.
2. **Optimize performance** for large datasets.
3. **Deploy the application** to a platform like Vercel, Netlify, or your preferred hosting service.

<img src="https://github.com/meghnadsaha/data-visualization-dashboard/blob/master/Screenshot.jpg"/>

This approach will help you create a comprehensive data visualization dashboard that meets the assignment requirements.
