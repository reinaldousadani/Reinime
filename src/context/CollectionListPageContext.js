import produce from "immer";
import createDataContext from "./createDataContext";

const SET_IS_RENAMING = "SET_IS_RENAMING";
const SET_IS_DELETING = "SET_IS_DELETING";
const SET_IS_ADDING_NEW = "SET_IS_ADDING_NEW";
const SET_SELECTED_COLLECTION_ID = "SET_SELECTED_COLLECTION_ID";
const SET_INITIAL_VALUE = "SET_INITIAL_VALUE";

const initialValue = {
  isRenaming: false,
  isDeleting: false,
  isAddingNew: false,
  selectedCollectionId: "",
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case SET_IS_RENAMING:
      draft.isRenaming = action.payload;
      break;
    case SET_IS_DELETING:
      draft.isDeleting = action.payload;
      break;
    case SET_IS_ADDING_NEW:
      draft.isAddingNew = action.payload;
      break;
    case SET_SELECTED_COLLECTION_ID:
      draft.selectedCollectionId = action.payload;
      break;
    case SET_INITIAL_VALUE:
      return { ...initialValue };
    default:
      break;
  }
});

const setAddNewModal = (dispatch) => {
  return (param) => {
    try {
      dispatch({ type: SET_IS_ADDING_NEW, payload: param });
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_IS_ADDING_NEW, payload: false });
    }
  };
};

const setDeleteCollectionModal = (dispatch) => {
  return (param, selectedId = "") => {
    try {
      dispatch({ type: SET_IS_DELETING, payload: param });
      dispatch({ type: SET_SELECTED_COLLECTION_ID, payload: selectedId });
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_IS_DELETING, payload: false });
      dispatch({ type: SET_SELECTED_COLLECTION_ID, payload: "" });
    }
  };
};

const setRenameCollectionModal = (dispatch) => {
  return (param, selectedId = "") => {
    try {
      dispatch({ type: SET_IS_RENAMING, payload: param });
      dispatch({ type: SET_SELECTED_COLLECTION_ID, payload: selectedId });
    } catch (error) {
      dispatch({ type: SET_IS_RENAMING, payload: false });
      dispatch({ type: SET_SELECTED_COLLECTION_ID, payload: "" });
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { setAddNewModal, setRenameCollectionModal, setDeleteCollectionModal },
  { ...initialValue }
);
