import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear any previous chart

    const gridSize = Math.floor(width / 24);
    const colorScale = d3.scaleSequential(d3.interpolateInferno)
      .domain([0, d3.max(data, d => d.intensity)]);

    const cards = svg.selectAll('.hour')
      .data(data, d => `${d.topic}:${d.intensity}`);

    cards.enter().append('rect')
      .attr('x', (d, i) => (i % 24) * gridSize)
      .attr('y', (d, i) => Math.floor(i / 24) * gridSize)
      .attr('width', gridSize)
      .attr('height', gridSize)
      .attr('fill', d => colorScale(d.intensity));

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default Heatmap;
