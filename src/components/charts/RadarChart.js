import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data = [] }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const radius = Math.min(width, height) / 2 - 30;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    svg.selectAll('*').remove(); // Clear any previous chart

    const angleSlice = Math.PI * 2 / data.length;

    const rScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius]);

    const line = d3.lineRadial()
      .curve(d3.curveLinearClosed)
      .angle((d, i) => i * angleSlice)
      .radius(d => rScale(d.value));

    const axis = svg.selectAll('.axis')
      .data(data)
      .enter().append('g')
      .attr('class', 'axis');

    axis.append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.axes))
      .style('stroke', 'steelblue')
      .style('fill', 'none');

    axis.append('text')
      .attr('class', 'axis-label')
      .attr('dy', '0.5em')
      .attr('text-anchor', 'middle')
      .attr('transform', (d, i) => `rotate(${i * 360 / data.length})translate(0,-10)`)
      .text(d => d.axis);

  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default RadarChart;
