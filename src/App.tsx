import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";
import { UserContext } from "./UserContext.tsx";
import RoutesList from './RoutesList';
import NavBar from './NavBar';
import whoGotNextApi from './api.tsx'
import './index.css'
import { loginFormData, registerPlayerFormData } from './types.tsx';
import ExtendedJwt from './interface.tsx';

/** App: main app component
 *
 * App -> NavBar
 *     -> RoutesList
 */

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const payload = jwtDecode(token) as ExtendedJwt;
                async function getPlayer() {
                    const userData = await whoGotNextApi.getPlayer(payload.username);
                    setUser(userData);
                    setIsLoading(false);
                }
                getPlayer();
            }
            catch (error) {
                console.error(error);
            }
        } else {
            setIsLoading(false);
        }

    }, [token]);

    /** Gets JWT
     *
     * - Takes in loginFormData
     *
     * - If successful, sets token state & JoblyApi.token
     *
     */

    async function login(loginFormData:loginFormData) {
        // post to /auth/token
        const token = await whoGotNextApi.getTokenLogin(loginFormData);
        setToken(token);
        // update whoGotNextApi.token
        localStorage.setItem("authToken", token);
        whoGotNextApi.token = token;

    }

    /** Gets JWT
     *
     * - Takes in registerFormData
     *
     * - If successful, sets token state & JoblyApi.token
     *
     */
    async function register(registerFormData:registerPlayerFormData) {
        // post to /auth/register
        const token = await whoGotNextApi.getTokenRegister(registerFormData);
        setToken(token);
        // update whoGotNextApi.token
        localStorage.setItem("authToken", token);
        whoGotNextApi.token = token;
    }

    /**Logs Out Current User */
    function logout() {
        setUser(null);
        setToken("");
        whoGotNextApi.token = "";
        localStorage.removeItem("authToken");
    }

    /**Updates User */
    // async function userUpdate(username:string, playerUpdateFormData:registerPlayerFormData) {
    //     // patch request to /users/{username}
    //     const newUser = await whoGotNextApi.patchUser(username, playerUpdateFormData);
    //     // setUser(returned data from patch request)
    //     setUser(newUser);
    // }



    if (isLoading) {
        return (
            <p>LOADING..</p>
        );
    }

  return (
    <div className='App bg-slate-200 pt-16'>
      <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <NavBar logout={logout}/>
        <RoutesList login={login} register={register}/>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
