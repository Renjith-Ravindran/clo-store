import styled from "@emotion/styled";
import type { Product } from "../store/productSlice";

const Card = styled.div`
  background: #1c1c1e;
  border: none;
  border-radius: 0.25rem;
  overflow: hidden;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  background: #333;
`;

const Info = styled.div`
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  gap: 0.5rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Username = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #aaa;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const PriceTag = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: #fff;
  padding: 0.25rem 0;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

interface ProductCardProps {
  product: Product;
}

const getPrice = (pricingOption: number, price: number): string => {
  switch (pricingOption) {
    case 0:
      return `$${price.toFixed(2)}`;
    case 1:
      return "FREE";
    case 2:
      return "View Only";
    default:
      return "";
  }
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <Image src={product.imagePath} alt={product.title} />
      <Info>
        <TitleDiv>
          <Title>{product.title}</Title>
          <Username>{product.creator}</Username>
        </TitleDiv>
        <PriceTag>{getPrice(product.pricingOption, product.price)}</PriceTag>
      </Info>
    </Card>
  );
}

export default ProductCard;
