import { useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { setKeyword } from "../store/productSlice";
import SearchIcon from "../assets/search.svg";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.25rem;
  margin: 2rem 1.5rem;
  background: #212025;
  position: relative;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    margin: 1rem 0.5rem;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #c3c1c6;
  font-weight: 600;
  padding: 1.2rem 0 1.2rem 1rem;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 1rem 0 1rem 0.8rem;
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c3c1c6;
  cursor: pointer;
  margin-left: 0.8rem;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-left: 0.5rem;
  }
`;

function SearchBar() {
  const keyword = useSelector((state: RootState) => state.products.keyword);
  const dispatch = useDispatch();

  //Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setKeyword(keyword));
    }, 500);

    return () => clearTimeout(handler);
  }, [keyword, dispatch]);

  const handleSearchClick = () => {
    dispatch(setKeyword(keyword));
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Find the items you're looking for"
        value={keyword}
        onChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      <SearchIconWrapper onClick={handleSearchClick}>
        <img src={SearchIcon} alt="search_icon" />
      </SearchIconWrapper>
    </SearchBarContainer>
  );
}

export default SearchBar;
