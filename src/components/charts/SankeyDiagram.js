import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SankeyDiagram = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear any previous chart

    const sankey = d3.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 6]]);

    const { nodes, links } = sankey(data);

    svg.append('g')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('height', d => d.y1 - d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('fill', 'blue')
      .append('title')
      .text(d => `${d.name}\n${d.value}`);

    svg.append('g')
      .attr('fill', 'none')
      .selectAll('g')
      .data(links)
      .join('path')
      .attr('d', d3.sankeyLinkHorizontal())
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.2)
      .attr('stroke-width', d => Math.max(1, d.width));

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default SankeyDiagram;
