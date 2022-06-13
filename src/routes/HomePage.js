import React from "react";
import AnimeList from "../components/AnimeList";
import { Provider as MainPageProvider } from "../context/MainPageContext";

const HomePage = () => {
  return (
    <>
      <AnimeList />
    </>
  );
};

const HomePageWithProvider = () => {
  return (
    <MainPageProvider>
      <HomePage />
    </MainPageProvider>
  );
};

export default HomePageWithProvider;
