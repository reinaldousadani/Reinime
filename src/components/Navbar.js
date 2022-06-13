import styled from "@emotion/styled";
import { useWindowSize } from "../hooks/useWindowSize";
import { theme } from "../theme";
import Brand from "./Brand";
import Container from "./Container";
import MobileNavLinks from "./MobileNavLinks";
import WebNavLinks from "./WebNavLinks";

const NavContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => {
  const { width } = useWindowSize();

  return (
    <nav>
      <Container>
        <NavContent>
          <Brand />
          {width > theme.main.breakPoints[1] ? (
            <WebNavLinks />
          ) : (
            <MobileNavLinks />
          )}
        </NavContent>
      </Container>
    </nav>
  );
};

export default Navbar;
