import { Link } from "react-router-dom";

/** NavBar: displays navbar
 *
 */
function NavBar() {


  return (
    <>
      <ol className="flex text-xs w-full items-center justify-around px-1 h-20 fixed top-0 z-10 bg-slate-50 md:text-sm">

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
    </>
  );
}

export default NavBar;