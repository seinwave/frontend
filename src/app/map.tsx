'use client';
import styles from './page.module.css';
import * as d3 from 'd3';
import { useEffect } from 'react';

interface Sector {
  id: number;
  name: string;
  coordinates: [number, number, number, number];
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

export default function Map({
  sector,
  plants,
}: {
  sector: Sector;
  plants: [Plant];
}) {
  const width = 960;
  const height = 500;

  const sectorObject = {
    type: 'Feature',
    properties: { name: sector.name },
    geometry: { type: 'Polygon', coordinates: sector.coordinates },
    geometries: [],
  };

  useEffect(() => {
    const projection = d3
      .geoMercator()
      .rotate([73.9652297, -40.6690291, 14.2])
      .fitSize([width, height], sectorObject);

    const svg = d3
      .select('.wrapper')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const path = d3.geoPath().projection(projection);

    svg.append('path').datum(sectorObject).attr('d', path);

    svg.attr('fill', 'none').attr('stroke', 'black');

    plants.forEach((plant) => {
      const lat = plant.latitude;
      const long = plant.longitude;

      const coordinates = [long, lat];

      svg
        .append('circle')
        .attr('cx', projection(coordinates)[0])
        .attr('cy', projection(coordinates)[1])
        .attr('r', 5)
        .attr('fill', 'red');
    });
  }, []);

  return <div className={'wrapper'}>MAP</div>;
}
