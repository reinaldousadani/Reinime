import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import gqlClient, { ApolloProvider } from "./api/gqlClient";
import NotFound from "./routes/NotFound";
import CollectionListPageWithProvider from "./routes/CollectionListPage";
import HomePageWithProvider from "./routes/HomePage";
import { Provider as CollectionProvider } from "./context/CollectionContext";
import AnimeDetailsPage from "./routes/AnimeDetailsPage";
import CollectionDetailsPage from "./routes/CollectionDetailsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={gqlClient}>
      <CollectionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePageWithProvider />} />
              <Route path="/anime/:animeId" element={<AnimeDetailsPage />} />
              <Route
                path="/collections"
                element={<CollectionListPageWithProvider />}
              />
              <Route
                path="/collection/:collectionId"
                element={<CollectionDetailsPage />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CollectionProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
