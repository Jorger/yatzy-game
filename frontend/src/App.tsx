import "./utils/sounds";
import { AppWrapper } from "./components/wrappers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading";
import React, { Suspense, lazy } from "react";

const AboutPage = lazy(() => import("./pages/about"));
const Lobby = lazy(() => import("./pages/lobby"));
const GamePage = lazy(() => import("./pages/game"));

const App = () => {
  return (
    <AppWrapper>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Lobby />} />
            <Route path="/" index element={<Lobby />} />
            <Route path="/game/:type" index element={<GamePage />} />
            <Route path="/about" index element={<AboutPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AppWrapper>
  );
};

export default React.memo(App);
