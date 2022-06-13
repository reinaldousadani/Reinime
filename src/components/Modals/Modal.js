import styled from "@emotion/styled";
import { theme } from "../../theme";
import Container from "../Container";
import Header from "../Header";
import VerticalSpacer from "../VerticalSpacer";

const ModalWrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  color: ${theme.main.colors.text};
  padding: ${theme.main.padding[6]};
  border-radius: ${theme.main.borderRadius["2xl"]};
  border: 2px solid ${theme.main.colors.text};
  background-color: white;
`;

const Modal = ({ isVisible = false, header = "", children }) => {
  return (
    <ModalWrapper isVisible={isVisible}>
      <Container>
        <ModalContent>
          <Header>{header}</Header>
          <VerticalSpacer />
          {children}
        </ModalContent>
      </Container>
    </ModalWrapper>
  );
};

export default Modal;
