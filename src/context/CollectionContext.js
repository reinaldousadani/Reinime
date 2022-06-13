import produce from "immer";
import createDataContext from "./createDataContext";
import { v4 as uuid } from "uuid";
import { theme } from "../theme";
import dayjs from "dayjs";

const SET_LOADING = "SET_LOADING";
const SET_INITIAL_VALUE = "SET_INITIAL_VALUE";
const SET_ERROR = "SET_ERROR";
const SET_COLLECTIONS = "SET_COLLECTIONS";

const initialValue = {
  loading: false,
  error: "",
  collections: [],
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case SET_COLLECTIONS:
      draft.collections = action.payload;
      break;
    case SET_INITIAL_VALUE:
      return { ...initialValue };
    default:
      break;
  }
});

export const getCollectionsFromLocalStorage = (dispatch) => {
  return async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const collections = localStorage.getItem("collections");
      console.log("Loaded", collections);
      if (!collections) {
        localStorage.setItem("collections", JSON.stringify([]));
        dispatch({ type: SET_COLLECTIONS, payload: [] });
      } else {
        const existingCollections = JSON.parse(collections);
        dispatch({
          type: SET_COLLECTIONS,
          payload: [...existingCollections],
        });
      }
      dispatch({ type: SET_LOADING, payload: false });
    } catch (err) {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: SET_ERROR, payload: err.message });
    }
  };
};

const saveNewCollectionToLocalStorage = (dispatch) => {
  return (collectionName = "", existingCollections) => {
    try {
      const newCollections = produce(existingCollections, (draft) => {
        draft.push({
          collectionId: uuid(),
          title: collectionName,
          bannerImg:
            theme.main.colors.collectionCover[Math.floor(Math.random() * 5)],
          animes: [],
        });
      });
      localStorage.setItem("collections", JSON.stringify(newCollections));
      dispatch({
        type: SET_COLLECTIONS,
        payload: newCollections,
      });
    } catch (error) {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: SET_ERROR, payload: error.message });
    }
  };
};

const deleteCollectionById = (dispatch) => {
  return (id = "") => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: SET_ERROR, payload: "" });
      const collections = JSON.parse(localStorage.getItem("collections"));
      const filteredCollections = collections.filter(
        (el) => el.collectionId !== id
      );
      localStorage.setItem("collections", JSON.stringify(filteredCollections));
      dispatch({
        type: SET_COLLECTIONS,
        payload: filteredCollections,
      });

      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: SET_ERROR, payload: error.message });
    }
  };
};

const renameCollectionById = (dispatch) => {
  return (collectionName = "", collectionId = "") => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      dispatch({ type: SET_ERROR, payload: "" });
      const collections = JSON.parse(localStorage.getItem("collections"));
      const mutatedCollections = collections.map((el) => {
        return el.collectionId !== collectionId
          ? el
          : { ...el, title: collectionName };
      });
      localStorage.setItem("collections", JSON.stringify(mutatedCollections));
      dispatch({
        type: SET_COLLECTIONS,
        payload: mutatedCollections,
      });
      dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: SET_ERROR, payload: error.message });
    }
  };
};

const addAnimeToCollections = (dispatch) => {
  return (animeId, collectionIds, bannerImg) => {
    try {
      const collections = JSON.parse(localStorage.getItem("collections"));
      if (!collectionIds) {
        const newArr = produce(collections, (draft) => {
          draft[0].animes.push({
            id: animeId,
            bannerImg: bannerImg,
            dateAdded: dayjs(),
          });
        });

        localStorage.setItem("collections", JSON.stringify(newArr));
        dispatch({
          type: SET_COLLECTIONS,
          payload: newArr,
        });
      } else {
        console.log("Hewwo");
        const filteredArr = collectionIds.map((id) => {
          return collections.find(
            (collection) => collection.collectionId === id
          );
        });
        console.log(filteredArr);
        const newArr = filteredArr.map((el) => ({
          ...el,
          animes: [
            ...el.animes,
            {
              id: animeId,
              bannerImg: bannerImg,
              dateAdded: dayjs(),
            },
          ],
        }));
        const finalArr = collections.map((collection) => {
          if (collectionIds.includes(collection.collectionId)) {
            return newArr.find(
              (el) => el.collectionId === collection.collectionId
            );
          } else {
            return collection;
          }
        });
        localStorage.setItem("collections", JSON.stringify(finalArr));
        dispatch({
          type: SET_COLLECTIONS,
          payload: finalArr,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteAnimesFromCollection = (dispatch) => {
  return (collectionId = "", animeIds = []) => {
    try {
      const collections = JSON.parse(localStorage.getItem("collections"));
      const targetCollection = collections.find(
        (collection) => collection.collectionId === collectionId
      );
      console.log(targetCollection);
      const newCollection = {
        ...targetCollection,
        animes: [
          ...targetCollection.animes.filter(
            (anime) => !animeIds.includes(anime.id)
          ),
        ],
      };
      const updatedCollection = collections.map((collection) => {
        if (collection.collectionId === newCollection.collectionId) {
          return newCollection;
        }
        return collection;
      });
      localStorage.setItem("collections", JSON.stringify(updatedCollection));
      dispatch({ type: SET_COLLECTIONS, payload: updatedCollection });
    } catch (error) {
      console.log(error);
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getCollectionsFromLocalStorage,
    deleteCollectionById,
    saveNewCollectionToLocalStorage,
    renameCollectionById,
    addAnimeToCollections,
    deleteAnimesFromCollection,
  },
  { ...initialValue }
);

// collections: [
//   {
//     collectionId: 0,
//     title: "Collection 1 ",
//     bannerImg:
//       "",
//     animes: [
//       {
//         animeId: 1535,
//         bannerImg: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1-T3PJUjFJyRwg.jpg",
//         dateAdded: new Date.now()
//       },
//       {
//         animeId: 21459,
//         bannerImg: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16-jmEaCBBN5WRS.jpg",
//         dateAdded: new Date.now(-1)
//       },
//     ],
//   },
//   {
//     collectionId: 1,
//     title: "Collection 2",
//     bannerImg: "",
//     animes: [
//       {
//         animeId: 16498,
//         bannerImg: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n15-1eTutXlxYzYl.jpg",
//         dateAdded: new Date.now(-1)
//       },
//       {
//         animeId: 21087,
//         bannerImg: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/18-aiibhi4BrZeR.jpg",
//         dateAdded: new Date.now()
//       },
//     ],
//   },
// ],
