import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./Home.tsx";
import QuickBasketballPage from "./quickbasketball/QuickBasketballPage.tsx";
import BasketballPage from "./pages/BasketballPage.tsx";
import YourLeaguesPage from "./pages/YourLeaguesPage.tsx";
import CreateLeaguePage from "./pages/CreateLeaguePage.tsx";
import { UserContext } from "./UserContext.tsx";
import LoginPage from "./pages/LoginPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"

/** RoutesList: All routes.
 *
 * RoutesList -> Home
 */

function RoutesList({login, register}:{login:Function, register:Function}) {
  const { user } = useContext(UserContext);
  return (

    <Routes>

      <Route path='/' element={<Home />} />
      {!user && (
                <>
                    <Route path="/login" element={<LoginPage login={login} />} />
                    <Route path="/signup" element={<RegisterPage register={register} />} />
                </>
            )}
      <Route path='/basketball' element={<BasketballPage />} />
      <Route path='/basketball/your-leagues' element={<YourLeaguesPage />} />
      <Route path='/basketball/create-league' element={<CreateLeaguePage />} />
      <Route path='/guest/basketball' element={<QuickBasketballPage />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default RoutesList;