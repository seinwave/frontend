'use-client';
import { FC, PropsWithChildren } from 'react';
import { Container, Wrapper, StyledSkeleton } from './skeleton.style';
import { Spacing } from '@/types/styles';

export type Props = PropsWithChildren<{
  className?: string;
  height?: string;
  margin?: Spacing;
  maxHeight?: string;
  maxWidth?: string;
  padding?: Spacing;
  width?: string;
  withShimmer?: boolean;
}>;

export const Skeleton: FC<Props> = ({
  className = '',
  height = '16px',
  margin = { top: '8px' },
  maxWidth,
  maxHeight,
  padding = {},
  width = '150px',
  ...rest
}) => {
  return (
    <Wrapper>
      <Container>
        <StyledSkeleton
          className={className}
          height={height}
          margin={margin}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          padding={padding}
          width={width}
          {...rest}
        ></StyledSkeleton>
      </Container>
    </Wrapper>
  );
};
