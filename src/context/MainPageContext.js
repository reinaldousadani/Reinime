import produce from "immer";
import createDataContext from "./createDataContext";

const SET_IS_BULKING = "SET_IS_BULKING";
const SET_IS_ADDING = "SET_IS_ADDING";
const SET_IS_CONFIRMING = "SET_IS_CONFIRMING";
const SET_SELECTED_ANIMES = "SET_SELECTED_ANIMES";
const SET_INITIAL_VALUE = "SET_INITIAL_VALUE";

const initialValue = {
  isBulking: false,
  isAdding: false,
  isConfirming: false,
  selectedAnimes: [],
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case SET_IS_BULKING:
      draft.isBulking = action.payload;
      break;
    case SET_SELECTED_ANIMES:
      draft.selectedAnimes = action.payload;
      break;
    case SET_IS_ADDING:
      draft.isAdding = action.payload;
      break;
    case SET_IS_CONFIRMING:
      draft.isConfirming = action.payload;
      break;
    case SET_INITIAL_VALUE:
      return { ...initialValue };
    default:
      break;
  }
});

const setIsBulking = (dispatch) => {
  return async (bool) => dispatch({ type: SET_IS_BULKING, payload: bool });
};

const setIsAdding = (dispatch) => {
  return async (bool) => dispatch({ type: SET_IS_ADDING, payload: bool });
};

const setIsConfirming = (dispatch) => {
  return async (bool) => dispatch({ type: SET_IS_CONFIRMING, payload: bool });
};

const setSelectedAnimes = (dispatch) => {
  return (existingSelectedAnimes = [], selectedAnime = "") => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

const setInitialValue = (dispatch) => () =>
  dispatch({ type: SET_INITIAL_VALUE });

export const { Context, Provider } = createDataContext(
  reducer,
  { setIsBulking, setInitialValue },
  { ...initialValue }
);

// total: 0,
//   currentPage: 1,
//   lastPage: 1,
//   hasNextPage: false,
//   perPage: DEFAULT_DATAS_PER_PAGE,
