import styled from "@emotion/styled";
import { theme } from "../theme";

const Wrapper = styled.div`
  position: fixed;
  bottom: ${theme.main.padding[8]};
  left: 50%;
  transform: translate(
    -50%,
    ${({ isVisible }) => {
      return isVisible ? "0%" : "1000%";
    }}
  );
  transition: ease-in-out 0.2s;
`;

export const PopUpBottom = ({ isVisible, children }) => {
  return <Wrapper isVisible={isVisible}>{children}</Wrapper>;
};
