import styled from "@emotion/styled";

const Nav = styled.nav`
  background-color: #000;
  color: white;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 0 0.5rem;
  }
`;

const NavIcon = styled.img`
  height: 1.5rem;
  margin: 1.5rem 1rem;
  width: 5rem;

  @media (max-width: 600px) {
    width: 60px;
    height: 20px;
    margin: 1rem 0.5rem;
  }
`;

const NavButton = styled.button`
  background-color: #68d69d;
  border: none;
  border-radius: 0 0 0.5rem 0.5rem;
  color: #000;
  height: 2.5rem;
  font-weight: 600;
  margin-right: 1rem;
  padding: 0 2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    height: 2rem;
    padding: 0 1rem;
    font-size: 0.85rem;
    margin-right: 0.5rem;
  }

  @media (max-width: 480px) {
    height: 1.5rem;
    padding: 0 0.5rem;
    font-size: 0.6rem;
    margin-right: 0.5rem;
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavIcon
        src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
        alt="Connect"
      />
      <NavButton>REQUIRED FEATURE</NavButton>
    </Nav>
  );
}

export default Navbar;
