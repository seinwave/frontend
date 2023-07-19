'use client';
import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import InfoPanel from '../InfoPanel';
import { Wrapper, Container, MapContainer } from './map.style';
import { type Sector, type Plant, type SectorObject } from '@/types/models';

export function Map({
  sectors,
  plants,
}: {
  sectors: [Sector];
  plants: [Plant];
}) {
  const [plant, setPlant] = useState<Plant | null>(null);

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
      .select('.map-container')
      .append('svg')
      .attr('height', 1200)
      .attr('width', 500)
      .attr('viewBox', '0 0 500 1200');

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
          .attr('id', plant.id)
          .attr('cx', projectionCoordinates[0])
          .attr('cy', projectionCoordinates[1])
          .attr('r', 2)
          .on('click', () => {
            setPlant(plant);
          })
          .attr('fill', 'purple');
      });

      const circle = d3.select(`#${plant?.id}`);

      function zoomed({ transform }: { transform: any }) {
        //TODO: how much to show or not?
        //TODO: can that be handled with the `tile` library? (vs zoom)
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

  return (
    <Wrapper className="wrapper">
      <Container className="container">
        {plant && <InfoPanel plant={plant} />}
      </Container>
      <MapContainer className="map-container"></MapContainer>
    </Wrapper>
  );
}
