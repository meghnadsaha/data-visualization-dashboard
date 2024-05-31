import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 450;
    const height = 450;
    const margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    svg.selectAll('*').remove(); // Clear any previous chart

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.topic))
      .range(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.intensity);

    const arc = d3.arc()
      .innerRadius(radius * 0.5) // Inner radius of the donut chart
      .outerRadius(radius * 0.8);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.topic));

    // Add text labels
    const arcLabel = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    arcs.append('text')
      .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.topic);

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default DonutChart;
