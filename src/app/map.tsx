'use client';
import styles from './page.module.css';
import * as d3 from 'd3';
import { useEffect } from 'react';

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
  const width = 960;
  const height = 900;

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

  const wholeMapObject = {
    type: 'FeatureCollection',
    name: 'whole-garden',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: [
      {
        type: 'Feature',
        properties: { Name: 'whole-garden' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-73.9651522, 40.6695492],
              [-73.9655015, 40.6685493],
              [-73.9655015, 40.6682889],
              [-73.9653567, 40.6682401],
              [-73.9648703, 40.6694878],
              [-73.9651522, 40.6695492],
            ],
          ],
        },
      },
    ],
    geometries: [],
  };

  useEffect(() => {
    const svg = d3
      .select('.wrapper')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#ffff')
      .attr('stroke', 'black');

    const firstTwoCoordinates =
      wholeMapObject.features[0].geometry.coordinates[0][0];

    const projection = d3
      .geoMercator()
      .rotate([...firstTwoCoordinates, 14.2])
      .fitSize([width, height], wholeMapObject);

    const path = d3.geoPath().projection(projection);

    svg.append('path').datum(wholeMapObject).attr('d', path);

    let allSectors = {
      type: 'FeatureCollection',
      features: sectorObjects,
      geometries: [],
    };
    const allProjection = d3
      .geoMercator()
      .rotate([0, 0, 14.2])
      .fitSize([width, height], allSectors);
    const allPath = d3.geoPath().projection(allProjection);

    sectorObjects.forEach((sectorObject) => {
      const bounds = d3.geoBounds(sectorObject);

      const width = bounds[1][0] - bounds[0][0];
      const height = bounds[1][1] - bounds[0][1];
      const projection = d3
        .geoMercator()
        .fitSize([width, height], sectorObject);

      const path = d3.geoPath().projection(projection);

      const group = svg.append('g');

      group.append('path').datum(sectorObject).attr('d', allPath);

      group.attr('fill', 'none').attr('stroke', 'red');
    });
    return () => {
      d3.select('.wrapper').selectAll('svg').remove();
      d3.select('.wrapper').selectAll('g').remove();
    };
  }, []);

  //   useEffect(() => {
  //     // if has existing svg, remove it
  //     // TODO: this is a hack, but it works for now
  //     // TODO: figure out why multiple SVGs are spawning, upon each hot refresh
  //     d3.select('svg').remove();

  //     plants.forEach((plant) => {
  //       const lat: number = plant.latitude;
  //       const long: number = plant.longitude;

  //       const coordinates: [number, number] = [long, lat];

  //       const projectionCoordinates = projection(coordinates);

  //       if (!projectionCoordinates) return;

  //       svg
  //         .append('circle')
  //         .attr('cx', projectionCoordinates[0])
  //         .attr('cy', projectionCoordinates[1])
  //         .attr('r', 5)
  //         .attr('fill', 'red');
  //     });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return <div className={'wrapper'}>MAP</div>;
}
