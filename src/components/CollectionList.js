import React, { useContext, useState } from "react";
import Button from "./Button";
import Header from "./Header";
import SectionHeader from "./SectionHeader";
import { Context as CollectionContext } from "../context/CollectionContext";
import { Context as CollectionListPageContext } from "../context/CollectionListPageContext";
import CollectionCard from "./CollectionCard";
import styled from "@emotion/styled";
import { theme } from "../theme";
import dayjs from "dayjs";
import produce from "immer";
import { useNavigate } from "react-router-dom";

export const CollectionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.main.padding[4]};
`;

const CollectionList = () => {
  const { state: collectionState } = useContext(CollectionContext);
  const {
    state: collectionListPageState,
    setAddNewModal,
    setDeleteCollectionModal,
    setRenameCollectionModal,
  } = useContext(CollectionListPageContext);
  const navigate = useNavigate();

  const handleOnClick = (e, id) => {
    e.preventDefault();
    navigate(`/collection/${id}`);
  };

  const handleRenameClick = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setRenameCollectionModal(true, idx);
  };

  const handleDeleteClick = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteCollectionModal(true, idx);
  };

  const handleAddNewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddNewModal(true);
  };

  return (
    <>
      <SectionHeader>
        <Header>Collection List</Header>
        <Button type="text" onClick={handleAddNewClick}>
          + Collection
        </Button>
      </SectionHeader>
      {collectionState.collections.length === 0 ? (
        <p>
          Oh my God...
          <br />
          You don't have any collections yet 😱
        </p>
      ) : (
        <CollectionListWrapper>
          {collectionState.collections?.map((collection, idx) => {
            const sorted = produce(collection, (draft) => {
              draft.animes = draft.animes?.sort((a, b) =>
                dayjs(a.dateAdded).isAfter(dayjs(b.dateAdded)) ? 1 : -1
              );

              if (draft.animes?.length > 0) {
                draft.bannerImg = draft.animes[0].bannerImg;
              }
            });
            return (
              <CollectionCard
                key={`${collection.collectionId}` + idx}
                title={collection.title}
                bannerImg={sorted.bannerImg}
                onRenameClick={(e) =>
                  handleRenameClick(e, collection.collectionId)
                }
                onDeleteClick={(e) =>
                  handleDeleteClick(e, collection.collectionId)
                }
                onClick={(e) => handleOnClick(e, collection.collectionId)}
              />
            );
          })}
        </CollectionListWrapper>
      )}
    </>
  );
};

export default CollectionList;
