import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AreaChart = ({ data = [] }) => {
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

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    const area = d3.area()
      .x((d, i) => x(i))
      .y0(height)
      .y1(d => y(d.intensity));

    svg.append('path')
      .datum(data)
      .attr('fill', 'steelblue')
      .attr('d', area);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .attr('text-anchor', 'middle')
      .text('Data Index');

    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 10)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Intensity');
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default AreaChart;
