import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BubbleChart = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear any previous chart

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const bubble = d3.pack()
      .size([width, height])
      .padding(1.5);

    const root = d3.hierarchy({ children: data })
      .sum(d => d.intensity);

    bubble(root);

    const node = svg.selectAll('.node')
      .data(root.children)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => color(d.data.topic));

    node.append('text')
      .attr('dy', '.3em')
      .attr('text-anchor', 'middle')
      .text(d => d.data.topic);

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default BubbleChart;
