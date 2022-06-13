import { theme } from "../theme";
import styled from "@emotion/styled";

const ErrorMessage = styled.p`
  margin-top: ${theme.main.padding[4]};
  margin-bottom: ${theme.main.padding[4]};
  color: ${theme.main.colors.danger};
  font-size: ${theme.main.fontSizes.md};
  font-weight: ${theme.main.fontWeights.bold};
`;

const Error = ({ message = "Oops, some error happened :(" }) => {
  return <ErrorMessage>{message}</ErrorMessage>;
};

export default Error;
