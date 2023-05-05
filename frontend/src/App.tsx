import "./utils/sounds";
import { AppWrapper } from "./components/wrappers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loading";
import React, { Suspense, lazy } from "react";

const AboutPage = lazy(() => import("./pages/about"));
const GamePage = lazy(() => import("./pages/game"));
const Guest = lazy(() => import("./pages/guest"));
const Lobby = lazy(() => import("./pages/lobby"));
const Online = lazy(() => import("./pages/online"));

const App = () => (
  <AppWrapper>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Lobby />} />
          <Route path="/" index element={<Lobby />} />
          <Route path="/game/:type" index element={<GamePage />} />
          <Route path="/about" index element={<AboutPage />} />
          <Route path="/online" index element={<Online />} />
          <Route path="/guest" index element={<Guest />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </AppWrapper>
);

export default React.memo(App);
