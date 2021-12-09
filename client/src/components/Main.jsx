import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import LinkDrawer from "./LinkDrawer"
import Characters from "./Characters";

export default function Main() {

  return (
    <div>
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route exact path="/Characters" element={<Characters />} />.

          </Routes>
          <Outlet />
        </div>
        <LinkDrawer>
        </LinkDrawer>
      </BrowserRouter>
    </div>
  );
};
