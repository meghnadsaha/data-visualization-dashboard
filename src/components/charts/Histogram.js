import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Histogram = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear any previous chart

    const x = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([margin.left, width - margin.right]);

    const bins = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(20))
      (data);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const bar = svg.selectAll('.bar')
      .data(bins)
      .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(${x(d.x0)},${y(d.length)})`);

    bar.append('rect')
      .attr('x', 1)
      .attr('width', x(bins[0].x1) - x(bins[0].x0) - 1)
      .attr('height', d => height - y(d.length))
      .attr('fill', 'steelblue');

    bar.append('text')
      .attr('dy', '.75em')
      .attr('y', -10)
      .attr('x', (x(bins[0].x1) - x(bins[0].x0)) / 2)
      .attr('text-anchor', 'middle')
      .text(d => d.length);

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

export default Histogram;
