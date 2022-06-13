import React, { useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Context as CollectionContext } from "./context/CollectionContext";
function App() {
  const { getCollectionsFromLocalStorage } = useContext(CollectionContext);
  const getCollectionsFromLocalStorageRef = useRef(
    getCollectionsFromLocalStorage
  );
  useEffect(() => {
    getCollectionsFromLocalStorageRef.current();
  }, []);
  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
