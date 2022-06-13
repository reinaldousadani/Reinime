import { theme } from "../theme";
import styled from "@emotion/styled";
import Skeleton from "react-loading-skeleton";
const StyledHeader = styled.h1`
  font-size: ${theme.main.fontSizes["2xl"]};
  font-weight: ${theme.main.fontWeights.bold};
`;

const Header = ({ loading = false, children }) => {
  if (loading) return <Skeleton count={2} style={{ width: "100%" }} />;
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
