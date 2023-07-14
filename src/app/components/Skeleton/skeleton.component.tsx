'use-client';

import { Container, Wrapper, SkeletonLoader } from './skeleton.style';

export function Skeleton() {
  return (
    <Wrapper>
      <Container>
        <SkeletonLoader></SkeletonLoader>
      </Container>
    </Wrapper>
  );
}
