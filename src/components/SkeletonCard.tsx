import styled from "@emotion/styled";

const SkeletonCardWrapper = styled.div`
  background: #1c1c1e;
  border: 1px solid #2e2e2e;
  border-radius: 0.25rem;
  overflow: hidden;
  color: #fff;
  display: flex;
  flex-direction: column;
  animation: pulse 1.2s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #2b2b2b;
    }
    50% {
      background-color: #3a3a3a;
    }
    100% {
      background-color: #2b2b2b;
    }
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const SkeletonImage = styled.div`
  background: #484848;
  height: 20rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;

  @media (max-width: 768px) {
    height: 16rem;
  }

  @media (max-width: 480px) {
    height: 14rem;
  }
`;

const SkeletonLine = styled.div<{ width: string }>`
  background: #484848;
  height: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  width: ${({ width }) => width};

  @media (max-width: 480px) {
    height: 0.65rem;
  }
`;

function SkeletonCard() {
  return (
    <SkeletonCardWrapper>
      <SkeletonImage />
      <SkeletonLine width="50%" />
      <SkeletonLine width="30%" />
    </SkeletonCardWrapper>
  );
}

export default SkeletonCard;
