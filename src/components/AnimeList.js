import styled from "@emotion/styled";
import React, { useContext, useEffect, useRef, useState } from "react";
import { theme, mq } from "../theme";
import AnimeCard from "./AnimeCard";
import Header from "./Header";
import SectionHeader from "./SectionHeader";
import { Context as MainPageContext } from "./../context/MainPageContext";
import Button from "./Button";
import Error from "./ErrorMessage";
import { useQuery } from "@apollo/client/react";
import { GET_ANIMES } from "../api/gqlQueries";
import { DEFAULT_DATAS_PER_PAGE } from "../utils/globalSettings";
import Pagination from "./Pagination";
import VerticalSpacer from "./VerticalSpacer";
import { useNavigate } from "react-router-dom";

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

const AnimeList = () => {
  const { state, setIsBulking, setInitialValue } = useContext(MainPageContext);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const navigate = useNavigate();
  const headerRef = useRef();
  const { data, loading, error } = useQuery(GET_ANIMES, {
    variables: {
      perPage: DEFAULT_DATAS_PER_PAGE,
      sort: "POPULARITY_DESC",
      page: page,
    },
    onCompleted: (data) => setLastPage(data.Page.pageInfo.lastPage),
  });

  const handleOnClick = (e, idx) => {
    e.preventDefault();
    navigate(`/anime/${idx}`);
  };

  return (
    <>
      <SectionHeader ref={headerRef}>
        <Header>Anime List</Header>
      </SectionHeader>

      {error ? (
        <Error />
      ) : loading ? (
        <>
          <Grid>
            {Array.from(Array(DEFAULT_DATAS_PER_PAGE).keys()).map((el) => (
              <AnimeCard key={el} loading />
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Grid>
            {data.Page.media.map((anime) => (
              <AnimeCard
                key={anime.id}
                title={anime.title.romaji}
                imgSrc={anime.coverImage.large}
                onClick={(e) => handleOnClick(e, anime.id)}
                noAction
              />
            ))}
          </Grid>
        </>
      )}
      <VerticalSpacer />
      <Pagination
        pageCount={lastPage}
        forcePage={page - 1}
        onPageChange={({ selected }) => {
          headerRef.current.scrollIntoView({ behavior: "smooth" });
          setPage(selected + 1);
        }}
      />
    </>
  );
};

export default AnimeList;
