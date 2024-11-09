import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import {UserContext} from "./UserContext"
import { useNavigate } from "react-router-dom";


/** NavBar: displays navbar
 *
 */
function NavBar({logout}:{logout:Function}) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <nav>
      <ol className="flex text-xs w-full items-center justify-around px-1 h-20 fixed top-0 z-10 bg-slate-50 md:text-sm">
      {user ?
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="" onClick={handleClick}>Logout {user.username}</NavLink>
        </>
        :
        <>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      }
        <li className="">
          <a href="/">{"WHO GOT NEXT"}</a>
        </li>
        <li className="">
          <Link to="/home">Home</Link>
        </li>
        <li className="">
          <Link to="/guest/basketball">Basketball</Link>
        </li>

      </ol>
    </nav>
  );
}

export default NavBar;