import styled from "@emotion/styled";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { theme } from "../theme";
import ImgNotFound from "../assets/ImgNotFound.png";
import { useQuery } from "@apollo/client";
import { GET_ANIME_BY_ID } from "../api/gqlQueries";
import Error from "./ErrorMessage";

const Card = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.5;
  background: transparent;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.main.padding[2]};
`;

const CoverImageWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: ${theme.main.borderRadius["2xl"]};
  cursor: pointer;
  box-shadow: ${({ isBulking }) =>
    isBulking
      ? `rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
  rgba(0, 0, 0, 0.3) 0px 8px 16px -8px`
      : "none"};
  transition: ease-in-out 0.2s;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${({ isBulking }) => (isBulking ? "brightness(90%)" : "none")};
  transition: linear 0.3s;
  border-radius: ${theme.main.borderRadius["2xl"]};
`;

const AnimeTitleWrapper = styled.div`
  max-width: 100%;
  aspect-ratio: 4/1;
`;

const AnimeTitle = styled.p`
  max-height: 100%;
  font-size: ${theme.main.fontSizes.md};
  font-weight: ${theme.main.fontWeights.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const TopRightActionWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  background: ${({ isBulking }) =>
    isBulking ? "transparent" : theme.main.colors.background};
  border: 2px solid white;
  overflow: hidden;
  padding: 2px;
  border-radius: ${theme.main.borderRadius["2xl"]};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ease-in-out 0.3s;
`;

const PlusButton = styled.div`
  font-size: ${theme.main.fontSizes["2xl"]};
  color: ${theme.main.colors.text};
`;

const CheckBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ selected }) =>
    selected ? theme.main.colors.confirm : "transparent"};
  border-radius: ${theme.main.borderRadius["xl"]};
  transition: ease-in-out 0.3s;
`;

const AnimeCard = ({
  title = "",
  isBulking = false,
  isSelected = false,
  noAction = false,
  imgSrc = "",
  loading = false,
  onClick = () => {},
  onActionClick = () => {},
  asyncLoad = false,
  asyncAnimeId = "",
}) => {
  const {
    data: asyncData,
    loading: asyncLoading,
    error: asyncError,
  } = useQuery(GET_ANIME_BY_ID, {
    variables: {
      id: asyncAnimeId,
    },
    onCompleted: (data) => console.log(data),
  });
  if (asyncLoad && asyncError)
    return (
      <Card>
        <Error />
      </Card>
    );

  const handleOnActionClick = (e) => {
    e.stopPropagation();
    onActionClick();
  };

  if (asyncLoad) {
    return (
      <Card>
        {asyncLoading && (
          <div style={{ height: "100%" }}>
            <Skeleton height={"80%"} />
            <Skeleton />
          </div>
        )}
        {!asyncLoading && (
          <>
            <CoverImageWrapper isBulking={isBulking} onClick={onClick}>
              {asyncData?.Media.coverImage.large ? (
                <CoverImage
                  isBulking={isBulking}
                  src={asyncData?.Media.coverImage.large}
                  alt={asyncData?.Media.title.romaji}
                />
              ) : (
                <img
                  src={ImgNotFound}
                  style={{ width: "25px", height: "25px" }}
                  alt="Not Found"
                />
              )}
              {!noAction && (
                <TopRightActionWrapper
                  isBulking={isBulking}
                  onClick={(e) => handleOnActionClick(e)}
                >
                  {isBulking ? (
                    <CheckBox selected={isSelected}></CheckBox>
                  ) : (
                    <PlusButton>+</PlusButton>
                  )}
                </TopRightActionWrapper>
              )}
            </CoverImageWrapper>
            <AnimeTitleWrapper>
              <AnimeTitle>{asyncData?.Media.title.romaji}</AnimeTitle>
            </AnimeTitleWrapper>
          </>
        )}
      </Card>
    );
  }

  return (
    <Card>
      {loading && (
        <div style={{ height: "100%" }}>
          <Skeleton height={"80%"} />
          <Skeleton />
        </div>
      )}
      {!loading && (
        <>
          <CoverImageWrapper isBulking={isBulking} onClick={onClick}>
            {imgSrc ? (
              <CoverImage isBulking={isBulking} src={imgSrc} alt={title} />
            ) : (
              <img
                src={ImgNotFound}
                style={{ width: "25px", height: "25px" }}
                alt="Not Found"
              />
            )}
            {!noAction && (
              <TopRightActionWrapper
                isBulking={isBulking}
                onClick={(e) => handleOnActionClick(e)}
              >
                {isBulking ? (
                  <CheckBox selected={isSelected}></CheckBox>
                ) : (
                  <PlusButton>+</PlusButton>
                )}
              </TopRightActionWrapper>
            )}
          </CoverImageWrapper>
          <AnimeTitleWrapper>
            <AnimeTitle>{title}</AnimeTitle>
          </AnimeTitleWrapper>
        </>
      )}
    </Card>
  );
};

export default AnimeCard;
