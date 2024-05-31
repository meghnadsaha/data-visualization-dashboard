import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    svg.selectAll('*').remove(); // Clear any previous chart

    const color = d3.scaleOrdinal()
      .domain(data.map((d, i) => i))
      .range(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.intensity);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.topic);

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default PieChart;
