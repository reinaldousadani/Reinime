import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import styled from "@emotion/styled";
import { theme, mq } from "../theme";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";
import { Context as CollectionContext } from "../context/CollectionContext";
import Skeleton from "react-loading-skeleton";
import Error from "../components/ErrorMessage";
import { PopUpBottom } from "../components/PopUpBottom";
import DeleteCollectionModal from "../components/Modals/DeleteCollectionModal";
import VerticalSpacer from "../components/VerticalSpacer";
import RenameModal from "../components/Modals/RenameModal";
const CollectionNameWrapper = styled.div`
  display: flex;
  gap: ${theme.main.padding[2]};
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.main.borderRadius["lg"]};
  padding-bottom: ${theme.main.padding[2]};
  padding-top: ${theme.main.padding[2]};
  padding-left: ${theme.main.padding[2]};
  padding-right: ${theme.main.padding[2]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: ${theme.main.padding[4]};
  column-gap: ${theme.main.padding[4]};
  ${mq[1]} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${mq[2]} {
    grid-template-columns: repeat(4, 1fr);
  }
  ${mq[3]} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const CollectionDetailsPage = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { state, deleteAnimesFromCollection } = useContext(CollectionContext);
  const [loading, setLoading] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState([]);
  const [collectionDetail, setCollectionDetail] = useState({});
  const [animeList, setAnimeList] = useState([]);
  useEffect(() => {
    setLoading(true);
    const [collectionDetail] = state.collections.filter(
      (collection) => collection.collectionId === collectionId
    );
    setCollectionDetail({ ...collectionDetail });
    const animes = collectionDetail?.animes;
    setAnimeList(animes ? [...animes] : []);
    setLoading(false);
  }, [collectionId, state.collections]);

  const handleOnCardClick = (e, id) => {
    if (!isDeleting) navigate(`/anime/${id}`);
    if (selectedAnime.includes(id)) {
      setSelectedAnime(selectedAnime.filter((anime) => anime !== id));
    } else {
      setSelectedAnime([...selectedAnime, id]);
    }
  };

  const handleOnDeleteConfirm = () => {
    deleteAnimesFromCollection(collectionId, selectedAnime);
    setIsDeleting(false);
    setIsConfirming(false);
    setSelectedAnime([]);
  };
  return (
    <>
      <SectionHeader>
        <CollectionNameWrapper bannerImg={collectionDetail.bannerImg}>
          <div>
            <p
              style={{
                fontSize: theme.main.fontSizes["2xl"],
                fontWeight: theme.main.fontWeights.bold,
              }}
            >
              {collectionDetail.title}
            </p>
          </div>
          <Button
            type="text"
            style={{
              alignSelf: "center",
              opacity: 0.8,
            }}
            onClick={() => setIsRenaming(true)}
          >
            {isRenaming ? "Save" : "Edit..."}
          </Button>
        </CollectionNameWrapper>
      </SectionHeader>
      <VerticalSpacer />
      <SectionHeader>
        <Header>Anime List</Header>
        {animeList?.length > 0 && (
          <Button
            type={`${isDeleting ? "text" : "danger"}`}
            onClick={() => {
              setIsDeleting(!isDeleting);
              setSelectedAnime([]);
            }}
          >
            {isDeleting ? "Cancel..." : "- Anime"}
          </Button>
        )}
      </SectionHeader>
      {animeList?.length === 0 ? (
        <Error message="No animes found in this collection..." />
      ) : (
        <>
          <Grid>
            {animeList.map((anime) => {
              return (
                <AnimeCard
                  key={`${anime.id}`}
                  asyncLoad
                  asyncAnimeId={anime.id}
                  noAction={!isDeleting}
                  isBulking={isDeleting}
                  isSelected={selectedAnime.includes(anime.id)}
                  onClick={(e) => handleOnCardClick(e, anime.id)}
                />
              );
            })}
          </Grid>
          <PopUpBottom isVisible={isDeleting && selectedAnime?.length > 0}>
            <Button
              type="danger"
              style={{ fontSize: theme.main.fontSizes["2xl"] }}
              onClick={() => setIsConfirming(true)}
            >
              {`Delete ${selectedAnime.length} items`}
            </Button>
          </PopUpBottom>
          <DeleteCollectionModal
            isVisible={isConfirming}
            header={`Are you sure you want to delete these ${selectedAnime.length} items?`}
            onCancel={() => setIsConfirming(false)}
            onDelete={handleOnDeleteConfirm}
          />
        </>
      )}
      {isRenaming && (
        <RenameModal
          isVisible={isRenaming}
          header="Enter new Collection Name"
          collectionId={collectionId}
          initialColName={collectionDetail.title}
          onOk={() => setIsRenaming(false)}
          onCancel={() => setIsRenaming(false)}
        />
      )}
    </>
  );
};

export default CollectionDetailsPage;

// Layout kira-kira
// <Flex>
//     <Flex>
//         <Header />
//         <Rename />
//     </Flex>
//     <Delete />
// </Flex>
// <AnimeList />
