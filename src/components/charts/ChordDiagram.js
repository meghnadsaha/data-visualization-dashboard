import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ChordDiagram = ({ matrix }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 600;
    const outerRadius = Math.min(width, height) * 0.5 - 10;
    const innerRadius = outerRadius - 24;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const chord = d3.chord()
      .padAngle(0.05)
      .sortSubgroups(d3.descending);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const ribbon = d3.ribbon()
      .radius(innerRadius);

    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    const chords = chord(matrix);

    svg.append('g')
      .selectAll('g')
      .data(chords.groups)
      .join('g')
      .append('path')
      .attr('fill', d => colors(d.index))
      .attr('d', arc);

    svg.append('g')
      .attr('fill-opacity', 0.67)
      .selectAll('g')
      .data(chords)
      .join('g')
      .append('path')
      .attr('d', ribbon)
      .attr('fill', d => colors(d.target.index))
      .append('title')
      .text(d => `${matrix.names[d.source.index]} → ${matrix.names[d.target.index]}: ${d.source.value}`);
  }, [matrix]);

  return <svg ref={svgRef}></svg>;
};

export default ChordDiagram;
