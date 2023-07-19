import styled from 'styled-components';

export const Wrapper = styled.div`
  color: green;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 3rem;
`;

export const Container = styled.div`
  width: 45vw;
`;

export const MapContainer = styled(Container)`
  border: solid 1px blue;
  overflow: hidden;
`;
