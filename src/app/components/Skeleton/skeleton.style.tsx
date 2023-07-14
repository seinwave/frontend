'use-client';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    from {
        left: -200px;
    }
    to {
        left: 100%;
    }
`;

export const Wrapper = styled.div``;

export const Container = styled.div``;

export const SkeletonLoader = styled.div`
  width: 200px;
  height: 20px;
  border-radius: 4px;
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
      #f7f7f7 50%,
      transparent 100%
    );
    animation: ${loadingAnimation} 0.7s ease-in-out infinite;
  }
`;
