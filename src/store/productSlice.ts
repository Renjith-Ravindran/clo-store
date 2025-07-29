import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getURLParams, updateURLParams } from "../utils/urlParams";

export const PricingOption = {
  PAID: 0,
  FREE: 1,
  VIEW_ONLY: 2,
} as const;

export type PricingOption = (typeof PricingOption)[keyof typeof PricingOption];

export type SortOrder = "NAME" | "PRICE_HIGH" | "PRICE_LOW";

export interface Product {
  id: string;
  creator: string;
  title: string;
  pricingOption: number;
  imagePath: string;
  price: number;
}

interface ProductState {
  allProducts: Product[];
  keyword: string;
  selectedFilters: PricingOption[];
  sortOrder: SortOrder;
  priceRange: [number, number];
}

const params = getURLParams();
const initialKeyword = params.get("keyword") || "";
const initialFilters = params.get("filters")?.split(",").map(Number) || [];
const initialSort = (params.get("sort") as SortOrder) || "NAME";
const initialMin = parseInt(params.get("min") || "0", 10);
const initialMax = parseInt(params.get("max") || "999", 10);

const initialState: ProductState = {
  allProducts: [],
  keyword: initialKeyword,
  selectedFilters: initialFilters as PricingOption[],
  sortOrder: initialSort,
  priceRange: [initialMin, initialMax],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.allProducts = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
      updateURLParams({
        keyword: state.keyword,
        filters: state.selectedFilters.join(","),
        sort: state.sortOrder,
        min: state.priceRange[0].toString(),
        max: state.priceRange[1].toString(),
      });
    },
    toggleFilter(state, action: PayloadAction<PricingOption>) {
      const option = action.payload;
      if (state.selectedFilters.includes(option)) {
        state.selectedFilters = state.selectedFilters.filter(
          (f) => f !== option
        );
      } else {
        state.selectedFilters.push(option);
      }
      updateURLParams({
        keyword: state.keyword,
        filters: state.selectedFilters.join(","),
        sort: state.sortOrder,
        min: state.priceRange[0].toString(),
        max: state.priceRange[1].toString(),
      });
    },
    resetFilters(state) {
      state.keyword = "";
      state.selectedFilters = [];
      state.priceRange = [0, 999];
      state.sortOrder = "NAME";

      window.history.replaceState({}, "", window.location.pathname);
    },
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
      updateURLParams({
        keyword: state.keyword,
        filters: state.selectedFilters.join(","),
        sort: state.sortOrder,
        min: state.priceRange[0].toString(),
        max: state.priceRange[1].toString(),
      });
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
      updateURLParams({
        keyword: state.keyword,
        filters: state.selectedFilters.join(","),
        sort: state.sortOrder,
        min: state.priceRange[0].toString(),
        max: state.priceRange[1].toString(),
      });
    },
  },
});

export const {
  setProducts,
  setKeyword,
  toggleFilter,
  resetFilters,
  setSortOrder,
  setPriceRange,
} = productSlice.actions;
export default productSlice.reducer;
