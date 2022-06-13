import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

import { theme } from "../theme";

const BrandText = styled.h1`
  font-weight: ${theme.main.fontWeights.bold};
  font-size: ${theme.main.fontSizes["4xl"]};
  color: ${theme.main.colors.text};
  text-decoration: none;
`;

const Brand = () => {
  return (
    <NavLink to="/" style={{ textDecoration: "none" }}>
      <BrandText>r.</BrandText>
    </NavLink>
  );
};

export default Brand;
