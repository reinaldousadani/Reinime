import Modal from "./Modal";
import styled from "@emotion/styled";
import { theme } from "../../theme";
import { Context as CollectionContext } from "../../context/CollectionContext";
import { useContext, useEffect, useState } from "react";
import produce from "immer";
import VerticalSpacer from "../VerticalSpacer";
import Button from "../Button";

import {
  SPECIAL_CHAR_CHECK,
  UNIQUE_COLLECTION_CHECK,
} from "../../validation/globalValidation";
export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & input[type="text"] {
    padding: ${theme.main.padding[2]};
    border-radius: ${theme.main.borderRadius["md"]};
    font-size: ${theme.main.fontSizes.md};
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.main.padding[4]};
`;

const RenameModal = ({
  isVisible = false,
  header = "",
  collectionId = "",
  initialColName = "",
  onOk = () => {},
  onCancel = () => {},
}) => {
  const { state, renameCollectionById } = useContext(CollectionContext);

  const [collectionName, setCollectionName] = useState(initialColName);
  const [errors, setErrors] = useState([]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setCollectionName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length > 0 || !collectionName) return;
    renameCollectionById(collectionName, collectionId);
    onOk();
    setCollectionName("");
  };

  const handleBack = (e) => {
    e.preventDefault();
    onCancel();
    setCollectionName("");
  };

  useEffect(() => {
    const errs = [];
    setErrors(errs);
    const validationErrors = produce(errs, (draft) => {
      if (SPECIAL_CHAR_CHECK.test(collectionName)) {
        draft.push("Can't contain special characters");
      }
      if (UNIQUE_COLLECTION_CHECK(collectionName, state.collections)) {
        draft.push(`${collectionName} already exists`);
      }
      if (!collectionName) {
        draft.push("Collection Name is required");
      }
    });
    setErrors(validationErrors);
  }, [collectionName, state.collections]);
  return (
    <Modal isVisible={isVisible} header={header}>
      <Form>
        <VerticalSpacer />
        <input
          type="text"
          value={collectionName}
          onChange={handleOnChange}
          required
          maxLength={140}
        />
        {errors?.map((errorMsg) => {
          return (
            <p key={errorMsg} style={{ color: theme.main.colors.danger }}>
              {errorMsg}
            </p>
          );
        })}
        <VerticalSpacer />
        <VerticalSpacer />
        <ActionWrapper>
          <Button onClick={handleSubmit}>Save</Button>
          <Button type="text" onClick={handleBack}>
            Back...
          </Button>
        </ActionWrapper>
      </Form>
    </Modal>
  );
};

export default RenameModal;
