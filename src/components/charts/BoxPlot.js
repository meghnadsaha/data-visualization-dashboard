import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BoxPlot = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear any previous chart

    const x = d3.scaleBand()
      .domain(data.map(d => d.group))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', d => x(d.group))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', x.bandwidth());

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default BoxPlot;
