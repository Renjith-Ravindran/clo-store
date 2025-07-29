import styled from "@emotion/styled";
import ProductCard from "./ProductCard";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import {
  PricingOption,
  setProducts,
  type Product,
  setSortOrder,
  type SortOrder,
} from "../store/productSlice";
import SkeletonCard from "./SkeletonCard";

const Grid = styled.div`
  display: grid;
  margin: 1rem 1.5rem;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 1.5rem 1rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    margin: 1rem 0.5rem;
    gap: 0.8rem;
  }
`;

const SortWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    margin: 0 1rem 0.8rem;
  }

  @media (max-width: 480px) {
    margin: 0 0.5rem 0.5rem;
    gap: 0.5rem;
  }
`;

const SortLabel = styled.p`
  color: #848486;
  font-weight: 500;
  color: #fff;
`;

const SortSelect = styled.select`
  background: transparent;
  color: #96969f;
  border: none;
  border-bottom: 1px solid #96969f;
  padding: 0.2rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    border-color: #fff;
    color: #fff;
  }

  option {
    background: #1c1c1e;
    color: #96969f;
  }
`;

const LoaderDiv = styled.div`
  text-align: center;
  padding: 1rem;
  color: #96969f;
  font-size: 0.9rem;
`;

function ContentList() {
  const { allProducts, keyword, selectedFilters, sortOrder, priceRange } =
    useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState<typeof allProducts>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const LIMIT = 8;

  async function fetchProducts() {
    const res = await fetch(
      "https://closet-recruiting-api.azurewebsites.net/api/data"
    );
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data: Product[] = await res.json();
    return data;
  }

  useEffect(() => {
    fetchProducts().then((data) => dispatch(setProducts(data)));
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => {
      const matchesFilter =
        selectedFilters.length === 0 ||
        selectedFilters.includes(product.pricingOption as PricingOption);
      const matchesPrice = selectedFilters.includes(PricingOption.PAID)
        ? (product.price ?? 0) >= priceRange[0] &&
          (product.price ?? 0) <= priceRange[1]
        : true;
      const matchesKeyword =
        keyword === "" ||
        product.title.toLowerCase().includes(keyword.toLowerCase()) ||
        product.creator.toLowerCase().includes(keyword.toLowerCase());
      return matchesFilter && matchesPrice && matchesKeyword;
    });

    products = [...products].sort((a, b) => {
      if (sortOrder === "PRICE_HIGH") {
        return (b.price ?? 0) - (a.price ?? 0);
      } else if (sortOrder === "PRICE_LOW") {
        return (a.price ?? Infinity) - (b.price ?? Infinity);
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return products;
  }, [allProducts, keyword, selectedFilters, sortOrder, priceRange]);

  useEffect(() => {
    setVisible(filteredProducts.slice(0, LIMIT));
    setHasMore(filteredProducts.length > LIMIT);
  }, [filteredProducts]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    //setTimeout(() => {
    setVisible((prev) => {
      if (prev.length >= filteredProducts.length) return prev;
      const next = filteredProducts.slice(prev.length, prev.length + LIMIT);
      const newItems = [...prev, ...next];
      if (newItems.length >= filteredProducts.length) setHasMore(false);
      return newItems;
    });
    setLoading(false);
    //}, 1000);
  }, [filteredProducts, hasMore, loading]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "100px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore, visible]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(e.target.value as SortOrder));
  };

  return (
    <>
      <SortWrapper>
        <SortLabel>Sort by</SortLabel>
        <SortSelect value={sortOrder} onChange={handleSortChange}>
          <option value="NAME">Relevance</option>
          <option value="PRICE_HIGH">Higher Price</option>
          <option value="PRICE_LOW">Lower Price</option>
        </SortSelect>
      </SortWrapper>
      <Grid>
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}

        {hasMore && !loading && (
          <LoaderDiv ref={loaderRef}>Loading...</LoaderDiv>
        )}
      </Grid>
    </>
  );
}

export default ContentList;
