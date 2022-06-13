import styled from "@emotion/styled";
import { theme } from "../theme";

const Button = styled.button`
  background-color: ${({ type }) => {
    switch (type) {
      case "text":
        return "transparent";
      case "danger":
        return theme.main.colors.danger;
      default:
        return "transparent";
    }
  }};
  padding-left: ${({ type }) => {
    switch (type) {
      case "text":
        return 0;
      case "danger":
        return theme.main.padding[4];
      default:
        return theme.main.padding[4];
    }
  }};
  padding-right: ${({ type }) => {
    switch (type) {
      case "text":
        return 0;
      case "danger":
        return theme.main.padding[4];
      default:
        return theme.main.padding[4];
    }
  }};
  font-size: ${theme.main.fontSizes["md"]};
  font-weight: ${({ type }) => {
    switch (type) {
      case "text":
        return theme.main.fontWeights.bold;
      case "danger":
        return theme.main.fontWeights.normal;
      default:
        return theme.main.fontWeights.bold;
    }
  }};
  cursor: pointer;
  border: 3px solid
    ${({ type }) => {
      switch (type) {
        case "text":
          return "transparent";
        case "danger":
          return theme.main.colors.danger;
        default:
          return theme.main.colors.text;
      }
    }};
  border-radius: ${theme.main.borderRadius["lg"]};
  color: ${({ type }) => {
    switch (type) {
      case "text":
        return theme.main.colors.text;
      case "danger":
        return theme.main.colors.background;
      default:
        return theme.main.colors.text;
    }
  }};
`;

export default Button;
