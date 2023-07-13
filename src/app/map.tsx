'use client';
import * as d3 from 'd3';
import { useEffect } from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  color: green;
  font-size: 3rem;
`;

interface Sector {
  id: number;
  name: string;
  coordinates: [number[], number[], number[], number[]];
  geojson_string: string;
}

interface Plant {
  id: number;
  name: string;
  sector_id: number;
  cultivar_id: number;
  latitude: number;
  longitude: number;
  form: number;
  status?: number;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
}

interface SectorObject {
  type: string;
  properties: { name: string };
  geometry: {
    type: string;
    coordinates: [number[], number[], number[], number[]];
  };
  geometries: Array<any>;
}

export default function Map({
  sectors,
  plants,
}: {
  sectors: [Sector];
  plants: [Plant];
}) {
  const sectorObjects: SectorObject[] = [];

  sectors.forEach((sector: Sector) => {
    const sectorObject = {
      type: 'Feature',
      properties: { name: sector.name },
      geometry: { type: 'Polygon', coordinates: sector.coordinates },
      geometries: [],
    };

    sectorObjects.push(sectorObject);
  });

  useEffect(() => {
    const svg = d3
      .select('.wrapper')
      .append('svg')
      .attr('height', 900)
      .attr('width', 1200)
      .attr('viewBox', '0 0 900 1200');

    const g = svg.append('g').attr('class', 'g');

    let allSectors = {
      type: 'FeatureCollection',
      features: sectorObjects,
      geometries: [],
    };
    const allProjection = d3
      .geoMercator()
      .rotate([73, -21, 14.2])
      .fitSize([900, 1200], allSectors);
    const allPath = d3.geoPath().projection(allProjection);

    sectorObjects.forEach((sectorObject) => {
      const sectorGroup = g.append('g');

      sectorGroup.append('path').datum(sectorObject).attr('d', allPath);

      sectorGroup.attr('fill', 'none').attr('stroke', 'red');

      plants.forEach((plant) => {
        const lat: number = plant.latitude;
        const long: number = plant.longitude;

        const coordinates: [number, number] = [long, lat];

        const projectionCoordinates = allProjection(coordinates);

        // don't render the plant if we don't have coordinates
        if (!projectionCoordinates) return;

        g.append('circle')
          .attr('class', 'plant')
          .attr('cx', projectionCoordinates[0])
          .attr('cy', projectionCoordinates[1])
          .attr('r', 2)
          .attr('fill', 'purple');
      });

      function zoomed({ transform }: { transform: any }) {
        g.attr('transform', transform);
      }

      d3.select('.wrapper').call(
        d3.zoom().scaleExtent([1, 5]).on('zoom', zoomed)
      );
    });
    return () => {
      d3.select('.wrapper').selectAll('svg').remove();
      d3.select('.wrapper').selectAll('g').remove();
    };
  }, []);

  return <Wrapper className="wrapper">Map!</Wrapper>;
}
