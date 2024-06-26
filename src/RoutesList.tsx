import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.tsx";
import QuickBasketballPage from "./QuickBasketballPage.tsx";

/** RoutesList: All routes.
 *
 * RoutesList -> Home
 */

function RoutesList() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/guest/basketball' element={<QuickBasketballPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default RoutesList;