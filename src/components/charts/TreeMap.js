import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TreeMap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear any previous chart

    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    const treeMapLayout = d3.treemap()
      .size([width, height])
      .padding(1)
      .round(true);

    treeMapLayout(root);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll('rect')
      .data(root.descendants())
      .join('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => color(d.data.group))
      .append('title')
      .text(d => `${d.data.name}: ${d.value}`);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default TreeMap;
