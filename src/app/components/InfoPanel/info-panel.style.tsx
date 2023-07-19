'use-client';

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: green;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 500px;
`;

export const PictureContainer = styled.div`
  display: flex;
  max-height: 450px;
  width: 100%;
`;

export const Picture = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  padding: 0.5rem;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NameRow = styled.div``;

export const Name = styled.h2`
  font-size: 3rem;
`;

export const GroupCategoryRow = styled.div``;

export const BreedingRow = styled.div``;

export const LocationRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SectorList = styled.div``;

export const ShoppingRow = styled.div``;
