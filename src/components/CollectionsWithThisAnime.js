import { useContext, useEffect, useState } from "react";
import { CollectionListWrapper } from "./CollectionList";
import Header from "./Header";
import SectionHeader from "./SectionHeader";
import { Context as CollectionContext } from "../context/CollectionContext";
import Skeleton from "react-loading-skeleton";
import produce from "immer";
import dayjs from "dayjs";
import CollectionCard from "./CollectionCard";
import { useNavigate } from "react-router-dom";

const CollectionsWithThisAnime = ({ loading = false, animeId = "" }) => {
  const { state } = useContext(CollectionContext);
  const [collectionList, setCollectionList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const filterCollection = () => {
      return state.collections.filter((collection) => {
        return (
          collection.animes.length > 0 &&
          collection.animes.map((anime) => anime.id).includes(animeId)
        );
      });
    };
    const result = filterCollection();
    console.log(result);
    setCollectionList(result);
  }, [animeId, state.collections]);

  if (loading) {
    return (
      <>
        <Skeleton />
        {collectionList.map((el) => (
          <Skeleton key={el.id} style={{ width: "100%", aspectRatio: "3/1" }} />
        ))}
      </>
    );
  }

  return (
    <>
      <SectionHeader>
        <Header>
          {collectionList.length > 0
            ? "Included in:"
            : "Not in any collections yet"}
        </Header>
      </SectionHeader>
      <CollectionListWrapper>
        {collectionList.map((collection, idx) => {
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
              noAction
              onClick={() => navigate(`/collection/${collection.collectionId}`)}
            />
          );
        })}
      </CollectionListWrapper>
    </>
  );
};

export default CollectionsWithThisAnime;
