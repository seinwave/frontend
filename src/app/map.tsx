'use client';
import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoPanel from './components/InfoPanel';

const Wrapper = styled.div`
  color: green;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 3rem;
`;

const Container = styled.div`
  width: 45vw;
`;

const MapContainer = styled(Container)`
  border: solid 1px blue;
  overflow: hidden;
`;

interface Sector {
  id: number;
  name: string;
  coordinates: [number[], number[], number[], number[]];
  geojson_string: string;
}

export interface Plant {
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

  const shouldRenderInfoPanel = plant !== null;

  console.log({ plant });

  return (
    <Wrapper className="wrapper">
      <Container className="container">
        {plant && <InfoPanel plant={plant} />}
      </Container>
      <MapContainer className="map-container"></MapContainer>
    </Wrapper>
  );
}
