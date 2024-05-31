import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HorizontalBarChart = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.selectAll('*').remove(); // Clear any previous chart

    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([0, width]);

    const y = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, height])
      .padding(0.1);

    svg.append('g')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', (d, i) => y(i))
      .attr('width', d => x(d.intensity))
      .attr('height', y.bandwidth())
      .attr('fill', 'steelblue');

    svg.append('g')
      .call(d3.axisLeft(y).tickFormat(i => data[i].topic));

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default HorizontalBarChart;
