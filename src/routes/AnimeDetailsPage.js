import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "../api/gqlClient";
import { GET_ANIME_BY_ID } from "../api/gqlQueries";
import Banner from "../components/AnimeBanner";
import Error from "../components/ErrorMessage";
import Header from "../components/Header";
import { theme, mq } from "../theme";
import VerticalSpacer from "../components/VerticalSpacer";
import { useWindowSize } from "../hooks/useWindowSize";
import AnimeCard from "../components/AnimeCard";
import Button from "../components/Button";
import AnimeDescription from "../components/AnimeDescription";
import AnimeGenres from "../components/AnimeGenres";
import Skeleton from "react-loading-skeleton";
import { Context as CollectionContext } from "../context/CollectionContext";
import AddNewCollectionModal from "../components/Modals/AddNewCollectionModal";
import CollectionNotFoundModal from "../components/Modals/CollectionNotFoundModal";
import AddToMultipleCollectionsModal from "../components/Modals/AddToMultipleCollectionsModal";
import CollectionsWithThisAnime from "../components/CollectionsWithThisAnime";
const Grid = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1.5fr;
  row-gap: ${theme.main.padding[4]};
  column-gap: ${theme.main.padding[4]};
  ${mq[1]} {
    grid-template-columns: 1fr 2fr;
  }
  ${mq[2]} {
    grid-template-columns: 1fr 3fr;
  }
`;

const AnimeDetailsCoverWrapper = styled.div`
  position: sticky;
  top: ${theme.main.padding[4]};
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${theme.main.padding[2]};
`;

const AnimeDetailsPage = () => {
  const { state, addAnimeToCollections } = useContext(CollectionContext);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const { animeId } = useParams();
  const { width } = useWindowSize();
  const { data, loading, error } = useQuery(GET_ANIME_BY_ID, {
    variables: {
      id: animeId,
    },
  });
  if (error) return <Error />;

  return (
    <>
      <Banner
        width={width}
        loading={loading}
        imgSrc={data?.Media.bannerImage}
      />
      <VerticalSpacer />
      <Grid>
        <AnimeDetailsCoverWrapper>
          <AnimeCard
            loading={loading}
            imgSrc={data?.Media.coverImage.large}
            noAction
          />
        </AnimeDetailsCoverWrapper>
        <Flex>
          <Header loading={loading}>{data?.Media.title.romaji}</Header>
          <AnimeDescription
            loading={loading}
            description={data?.Media.description}
          />
          <AnimeGenres loading={loading} genres={data?.Media.genres} />
          {loading ? (
            <Skeleton />
          ) : (
            <p>
              <strong>Rating : </strong>
              {data?.Media.averageScore ? data?.Media.averageScore : "-"}
            </p>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <p>
              <strong>Num. of Episodes : </strong>
              {data?.Media.episodes ? data?.Media.episodes : "-"}
            </p>
          )}

          {loading ? (
            <Skeleton width="100" />
          ) : (
            <Button
              style={{ alignSelf: "self-start" }}
              onClick={() => setIsAdding(!isAdding)}
            >
              + Add to Collection
            </Button>
          )}
        </Flex>
      </Grid>
      <VerticalSpacer />
      <CollectionsWithThisAnime animeId={animeId} loading={loading} />
      {loading ? null : state.collections?.length === 0 ? (
        <CollectionNotFoundModal
          isVisible={isAdding}
          header="There's no collection found yet. Lets create one!"
          onCancel={() => setIsAdding(false)}
          onOk={() => {
            addAnimeToCollections(animeId, null, data?.Media.bannerImage);
            setIsAdding(false);
            setSelectedIds([]);
          }}
        />
      ) : (
        <AddToMultipleCollectionsModal
          isVisible={isAdding}
          header={`Add ${data.Media.title.romaji} to:`}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          animeId={animeId}
          onOk={() => {
            addAnimeToCollections(animeId, selectedIds, data.Media.bannerImage);
            setIsAdding(false);
            setSelectedIds([]);
          }}
          onCancel={() => {
            setIsAdding(false);
            setSelectedIds([]);
          }}
        />
      )}
    </>
  );
};

export default AnimeDetailsPage;

// Layout Structure Kira Kira
// <Banner />
// <Grid>
//     <AnimeCard />
//     <FlexColumn>
//         <AnimeTitle />
//         <AnimeDescription />
//         <AnimeTags />
//         <AnimeRatings />
//         <AnimeNumOfEp />
//         <Button addToCollection />
//     </FlexColumn>
// </Grid>
// <CollectionList />
