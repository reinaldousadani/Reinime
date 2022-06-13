import Button from "../Button";
import VerticalSpacer from "../VerticalSpacer";
import Modal from "./Modal";
import styled from "@emotion/styled";
import { theme } from "../../theme";
const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.main.padding[4]};
`;

const DeleteCollectionModal = ({
  isVisible = false,
  header = "Are you sure you want to delete?",
  onDelete = () => {},
  onCancel = () => {},
}) => {
  return (
    <Modal isVisible={isVisible} header={header}>
      <VerticalSpacer />
      <VerticalSpacer />
      <ActionWrapper>
        <Button type="danger" onClick={onDelete}>
          Delete
        </Button>
        <Button type="text" onClick={onCancel}>
          Nope...
        </Button>
      </ActionWrapper>
    </Modal>
  );
};

export default DeleteCollectionModal;
