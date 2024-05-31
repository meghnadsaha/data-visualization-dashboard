import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.intensity)]).range([height, 0]);

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d.intensity));

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    svg.selectAll("*").remove(); // Clear any previous chart

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default LineChart;
