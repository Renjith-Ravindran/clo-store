import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import {
  toggleFilter,
  resetFilters,
  PricingOption,
  setPriceRange,
} from "../store/productSlice";

const ContentFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 0.25rem;
  margin: 2rem 1.5rem 1rem 1.5rem;
  padding: 1rem 2rem;
  background: #000;

  @media (max-width: 768px) {
    margin: 1.5rem 1rem;
    padding: 0.8rem 1rem;
  }

  @media (max-width: 480px) {
    margin: 1rem 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ContentFilterCaption = styled.p`
  color: #848486;
  font-size: 0.9rem;
  margin-right: 1rem;
`;

const ContentFilterOptionsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ContentFilterInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  color: #848486;
`;

const ContentFilterResetButton = styled.button`
  border: none;
  color: #96969f;
  background: transparent;
  font-weight: 800;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: #fff;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #96969f;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  input[type="checkbox"] {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1.5px solid #96969f;
    background: #48474f;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  input[type="checkbox"]:checked {
    background: #96969f;
    border-color: #96969f;
  }

  input[type="checkbox"]:hover {
    border-color: #fff;
  }

  input[type="checkbox"]:checked::after {
    content: "";
    position: absolute;
    width: 0.25rem;
    height: 0.5rem;
    border: solid #1c1c1e;
    border-width: 0 2px 2px 0;
    top: 1px;
    left: 4px;
    transform: rotate(45deg);
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 30rem;
  color: #96969f;

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    max-width: 25rem;
  }
`;

const PriceValue = styled.span`
  display: inline-block;
  width: 2rem;
  text-align: right;
  font-size: 0.9rem;
  font-family: monospace;
  flex-shrink: 0;
`;

const SliderWrapper = styled.div`
  position: relative;
  flex: 1;
  height: 0.25rem;
  background: #444;
  border-radius: 2px;
`;

const ActiveTrack = styled.div<{ left: number; width: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 0.25rem;
  background: #1ed760;
  border-radius: 2px;
  left: ${({ left }) => left}%;
  width: ${({ width }) => width}%;
  z-index: 1;
`;

const SliderInput = styled.input<{ isUpper?: boolean }>`
  position: absolute;
  width: 100%;
  appearance: none;
  background: none;
  height: 3px;
  margin: 0;
  cursor: pointer;
  z-index: 5;

  ${({ isUpper }) => isUpper && `pointer-events: none;`}

  &::-webkit-slider-runnable-track {
    background: transparent;
  }
  &::-moz-range-track {
    background: transparent;
    position: relative;
    z-index: 1;
  }

  &::-webkit-slider-thumb {
    pointer-events: all;
    appearance: none;
    width: 0.9rem;
    height: 0.9rem;
    background: #96969f;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 5;
  }

  &::-moz-range-thumb {
    pointer-events: all;
    appearance: none;
    width: 0.9rem;
    height: 0.9rem;
    background: #96969f;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 5;
  }
`;

function ContentFilter() {
  const selectedFilters = useSelector(
    (state: RootState) => state.products.selectedFilters
  );
  const priceRange = useSelector(
    (state: RootState) => state.products.priceRange
  );
  const dispatch = useDispatch();

  const options = [
    { value: PricingOption.PAID, label: "Paid" },
    { value: PricingOption.FREE, label: "Free" },
    { value: PricingOption.VIEW_ONLY, label: "View Only" },
  ];
  const [minValue, setMinValue] = useState(priceRange[0]);
  const [maxValue, setMaxValue] = useState(priceRange[1]);

  const paidSelected = selectedFilters.includes(PricingOption.PAID);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    dispatch(setPriceRange([value, maxValue]));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    dispatch(setPriceRange([minValue, value]));
  };

  useEffect(() => {
    setMinValue(priceRange[0]);
    setMaxValue(priceRange[1]);
  }, [priceRange]);

  return (
    <ContentFilterContainer>
      <ContentFilterOptionsDiv>
        <ContentFilterCaption>Pricing Option</ContentFilterCaption>
        <ContentFilterInputDiv>
          {options.map((option) => (
            <CheckboxLabel key={option.value}>
              <input
                type="checkbox"
                checked={selectedFilters.includes(option.value)}
                onChange={() => dispatch(toggleFilter(option.value))}
              />
              {option.label}
            </CheckboxLabel>
          ))}
        </ContentFilterInputDiv>
      </ContentFilterOptionsDiv>
      {paidSelected && (
        <SliderContainer>
          <PriceValue>${minValue}</PriceValue>

          <SliderWrapper>
            <ActiveTrack
              left={(minValue / 999) * 100}
              width={((maxValue - minValue) / 999) * 100}
            />

            <SliderInput
              type="range"
              min="0"
              max="999"
              value={minValue}
              onChange={handleMinChange}
            />

            <SliderInput
              type="range"
              min="0"
              max="999"
              value={maxValue}
              onChange={handleMaxChange}
              isUpper
            />
          </SliderWrapper>

          <PriceValue>${maxValue}</PriceValue>
        </SliderContainer>
      )}
      <ContentFilterResetButton onClick={() => dispatch(resetFilters())}>
        RESET
      </ContentFilterResetButton>
    </ContentFilterContainer>
  );
}

export default ContentFilter;
