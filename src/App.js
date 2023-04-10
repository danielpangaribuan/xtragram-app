import React, { useState } from "react";
import { Header, Menu } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/users";
import Albums from "./pages/albums";
import AlbumsDetail from "./pages/albumsDetail";
import Posts from "./pages/posts";

function App() {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="bg-neutral-100 min-h-screen">
      <BrowserRouter>
        <Header keyword={keyword} setKeyword={setKeyword} />
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-4 space-x-4">
            <Menu resetKeyword={setKeyword} />
            <div className="col-span-3">
              <Routes>
                <Route
                  path="users"
                  element={<Users keyword={keyword} />}
                ></Route>
                <Route
                  path="albums"
                  element={<Albums keyword={keyword} />}
                ></Route>
                <Route
                  path="albums/:id"
                  element={<AlbumsDetail keyword={keyword} />}
                ></Route>
                <Route
                  path="posts"
                  element={<Posts keyword={keyword} />}
                ></Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
