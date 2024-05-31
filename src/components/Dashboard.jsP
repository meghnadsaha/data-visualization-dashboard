import React, { useEffect, useState } from "react";
import fetchData from "../services/fetchData";
import Filters from "./Filters";
import LineChart from "./charts/linechart/LineChart";
import VerticalBarChart from "./charts/barchart/VerticalBarChart";
import PieChart from "./charts/pieChart/PieChart";
import ScatterPlot from "./charts/scatterPlot/ScatterPlot";
import AreaChart from "./charts/areaChart/AreaChart";
import DonutChart from "./charts/donutChart/DonutChart";
import HorizontalBarChart from "./charts/barchart/HorizontalBarChart";
import BubbleChart from "./charts/bubbleChart/BubbleChart";
import Heatmap from "./charts/Heatmap";
import BoxPlot from "./charts/BoxPlot";
import ChordDiagram from "./charts/ChordDiagram";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
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
      [name]: value,
    });
  };

  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      return filters[key] === "" || item[key] === filters[key];
    });
  });

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <LineChart data={filteredData} />
      {/* Pass filteredData to the LineChart component */}
      <PieChart data={filteredData} />
      <VerticalBarChart data={filteredData} />
      <HorizontalBarChart data={filteredData} />
      <ScatterPlot data={filteredData} />
      <AreaChart data={filteredData} />
      <DonutChart data={filteredData} />
    </div>
  );
};

export default Dashboard;
