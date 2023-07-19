'use-client';
import { FC, PropsWithChildren } from 'react';
import { StyledSkeleton } from './skeleton.style';
import { Spacing } from '@/types/styles';

export type Props = PropsWithChildren<{
  className?: string;
  height?: string;
  margin?: Spacing;
  maxHeight?: string;
  maxWidth?: string;
  padding?: Spacing;
  width?: string;
  borderRadius?: string;
}>;

export const Skeleton: FC<Props> = ({
  className = '',
  height = '16px',
  margin = { top: '8px' },
  maxWidth,
  maxHeight,
  padding = {},
  width = '150px',
  borderRadius = '4px',
  ...rest
}) => {
  return (
    <StyledSkeleton
      className={className}
      height={height}
      margin={margin}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      padding={padding}
      width={width}
      borderRadius={borderRadius}
      {...rest}
    ></StyledSkeleton>
  );
};
