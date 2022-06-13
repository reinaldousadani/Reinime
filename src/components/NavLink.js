import { NavLink as RouterNL } from "react-router-dom";
import styled from "@emotion/styled";
import { theme } from "../theme";

const Link = styled.p`
  color: ${theme.main.colors.text};
  font-weight: ${theme.main.fontWeights.bold};
  font-size: ${theme.main.fontSizes["2xl"]};
`;

const NavLink = ({ to = "/", text = "" }) => {
  return (
    <RouterNL
      to={to}
      style={({ isActive }) => ({
        transition: "ease-in-out 0.2s",
        position: "relative",
        padding: theme.main.padding["2"],
        textDecoration: "none",
        border: `3px solid ${
          isActive ? theme.main.colors.text : "transparent"
        }`,
        borderRadius: theme.main.borderRadius["2xl"],
      })}
    >
      <Link>{text}</Link>
    </RouterNL>
  );
};

export default NavLink;
