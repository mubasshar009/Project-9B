import React, { FC } from "react";
import { Route, Routes } from "react-router";
import Diaries from "../diary/Diaries";
import Editor from "../entry/Editor";

const Home: FC = () => {
  return (
    <div className="two-cols">
      <div className="left">
        <Routes>
          <Route path="/" element={<Diaries />}>
            
          </Route>
          <Route path="/" element={<Editor />}>
          </Route>
        </Routes>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Home;
