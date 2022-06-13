import React, { useContext } from "react";
import CollectionList from "../components/CollectionList";
import AddNewCollectionModal from "../components/Modals/AddNewCollectionModal";
import DeleteCollectionModal from "../components/Modals/DeleteCollectionModal";
import RenameCollectionModal from "../components/Modals/RenameCollectionModal";
import { Context as CollectionContext } from "../context/CollectionContext";
import {
  Context as CollectionListPageContext,
  Provider as CollectionListPageProvider,
} from "../context/CollectionListPageContext";

const CollectionListPage = () => {
  const { state: collectionListPageState, setDeleteCollectionModal } =
    useContext(CollectionListPageContext);
  const { state: collectionState, deleteCollectionById } =
    useContext(CollectionContext);

  const findCollectionNameById = (id = "") => {
    const result = collectionState.collections.find(
      (el) => el.collectionId === id
    );
    if (!result) return "";
    return result.title;
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    deleteCollectionById(collectionListPageState.selectedCollectionId);
    setDeleteCollectionModal(false, "");
  };

  const handleDeleteCancel = (e) => {
    e.preventDefault();
    setDeleteCollectionModal(false, "");
  };

  return (
    <>
      <CollectionList />
      <AddNewCollectionModal
        isVisible={collectionListPageState.isAddingNew}
        header="Enter Collection Name"
      />
      <DeleteCollectionModal
        isVisible={
          collectionListPageState.isDeleting &&
          collectionListPageState.selectedCollectionId
        }
        header={`Are you sure you want to delete "${findCollectionNameById(
          collectionListPageState.selectedCollectionId
        )}"?`}
        selectedId={collectionListPageState.selectedCollectionId}
        onDelete={handleOnDelete}
        onCancel={handleDeleteCancel}
      />
      <RenameCollectionModal
        isVisible={collectionListPageState.isRenaming}
        header="Enter Collection Name"
      />
    </>
  );
};

const CollectionListPageWithProvider = () => {
  return (
    <CollectionListPageProvider>
      <CollectionListPage />
    </CollectionListPageProvider>
  );
};

export default CollectionListPageWithProvider;
