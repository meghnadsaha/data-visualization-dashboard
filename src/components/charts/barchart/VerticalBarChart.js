import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const VerticalBarChart = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.selectAll('*').remove(); // Clear any previous chart

    const x = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([height, 0]);

    svg.append('g')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.intensity))
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].topic));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default VerticalBarChart;
