import { theme } from "../../theme";
import Button from "../Button";
import styled from "@emotion/styled";
import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import VerticalSpacer from "../VerticalSpacer";

import { Context as CollectionContext } from "../../context/CollectionContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;

  & input[type="text"] {
    padding: ${theme.main.padding[2]};
    border-radius: ${theme.main.borderRadius["md"]};
    font-size: ${theme.main.fontSizes.md};
  }

  & label {
    font-size: ${theme.main.fontSizes.xl};
    font-weight: ${theme.main.fontWeights.medium};
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.main.padding[4]};
  align-items: center;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${theme.main.padding[4]};
  align-items: center;
`;

const AddToMultipleCollectionsModal = ({
  isVisible = false,
  header = "",
  onOk = () => {},
  onCancel = () => {},
  selectedIds = [],
  setSelectedIds = () => {},
  animeId,
}) => {
  const { state } = useContext(CollectionContext);

  const onChangeHandler = (e, id) => {
    if (!e.target.checked) {
      console.log(selectedIds);
      setSelectedIds(selectedIds.filter((el) => el !== id));
    } else {
      console.log(selectedIds);

      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onOk();
    setSelectedIds([]);
  };

  const handleBack = (e) => {
    e.preventDefault();
    onCancel();
    setSelectedIds([]);
  };
  return (
    <Modal isVisible={isVisible} header={header}>
      <Form>
        <VerticalSpacer />
        {state.collections.map((el) => {
          return (
            <CheckBoxWrapper key={el.collectionId}>
              <input
                type="checkbox"
                disabled={el.animes.map((anime) => anime.id).includes(animeId)}
                onChange={(e) => onChangeHandler(e, el.collectionId)}
                checked={selectedIds.includes(el.collectionId)}
              />
              <label>
                {el.title}
                {el.animes.map((anime) => anime.id).includes(animeId) && (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "4px",
                      fontSize: theme.main.fontSizes.sm,
                    }}
                  >
                    {"Exist"}
                  </span>
                )}
              </label>
            </CheckBoxWrapper>
          );
        })}
        <VerticalSpacer />
        <VerticalSpacer />
        <ActionWrapper>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleBack} type="text">
            Back...
          </Button>
        </ActionWrapper>
      </Form>
    </Modal>
  );
};

export default AddToMultipleCollectionsModal;

{
  /* <form style={{ display: "flex", flexDirection: "column" }}>
        <label>Collection Name</label>
        <input style={{ boxSizing: "border-box" }} type="text" required />
        <Button>Submit</Button>
      </form> */
}
