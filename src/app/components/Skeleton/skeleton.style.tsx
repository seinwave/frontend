'use-client';
import styled, { keyframes } from 'styled-components';
import { Spacing } from '@/types/styles';

const loadingAnimation = keyframes`
    from {
        left: -200px;
    }
    to {
        left: 100%;
    }
`;

export const StyledSkeleton = styled.div<{
  height: string;
  margin: Spacing;
  maxHeight?: string;
  maxWidth?: string;
  padding: Spacing;
  width: string;
  borderRadius: string;
}>`
  border-radius: ${({ borderRadius }) => borderRadius};
  height: ${({ height }) => height};
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -200px;
    top: 0;
    height: 100%;
    width: 200px;
    background: linear-gradient(
      to right,
      transparent 0%,
      hsl(0, 0%, 94%) 25%,
      transparent 100%
    );
    animation: ${loadingAnimation} 0.7s ease-in-out infinite;
  }
`;
