'use-client';
import {
  Wrapper,
  Container,
  PictureContainer,
  Picture,
  NameRow,
  Name,
  GroupCategoryRow,
  BreedingRow,
  LocationRow,
  ShoppingRow,
  InfoContainer,
  SectorList,
} from './info-panel.style';

export function InfoPanel() {
  return (
    <Wrapper>
      <Container>
        <PictureContainer>
          <Picture src="https://via.placeholder.com/400x200" />
        </PictureContainer>
        <InfoContainer>
          <NameRow>
            <Name>name</Name>
          </NameRow>
          <GroupCategoryRow>
            <div>group</div>
            <div>category</div>
          </GroupCategoryRow>
          <BreedingRow>Breeder - Year </BreedingRow>
          <LocationRow>
            <div># in garden -- </div>
            <SectorList> b1 b2 b3</SectorList>
          </LocationRow>
          <ShoppingRow>Link to a rose shopping website</ShoppingRow>
        </InfoContainer>
      </Container>
    </Wrapper>
  );
}
