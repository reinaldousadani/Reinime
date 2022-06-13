import { theme } from "../../theme";
import Button from "../Button";
import styled from "@emotion/styled";
import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import VerticalSpacer from "../VerticalSpacer";
import {
  SPECIAL_CHAR_CHECK,
  UNIQUE_COLLECTION_CHECK,
} from "../../validation/globalValidation";
import { Context as CollectionContext } from "../../context/CollectionContext";
import { Context as CollectionListPageContext } from "../../context/CollectionListPageContext";

import produce from "immer";

const Form = styled.form`
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

const AddNewCollectionModal = ({
  isVisible = false,
  header = "",
  onOk = () => {},
  onCancel = () => {},
}) => {
  const { state, saveNewCollectionToLocalStorage } =
    useContext(CollectionContext);
  const { setAddNewModal } = useContext(CollectionListPageContext);
  const [collectionName, setCollectionName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setCollectionName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length > 0 || !collectionName) return;
    saveNewCollectionToLocalStorage(collectionName, [...state.collections]);
    setAddNewModal(false);
    setCollectionName("");
  };

  const handleBack = (e) => {
    e.preventDefault();
    setAddNewModal(false);
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

export default AddNewCollectionModal;

{
  /* <form style={{ display: "flex", flexDirection: "column" }}>
        <label>Collection Name</label>
        <input style={{ boxSizing: "border-box" }} type="text" required />
        <Button>Submit</Button>
      </form> */
}
