import "./Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "../ui/Container";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import logoImg from "./../../assets/logo.png";
import LoadingBar from "react-top-loading-bar";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();

  const [theme, setTheme] = useState("light");
  const [navbarBackgroundColor, setNavbarBackgroundColor] = useState("");
  const [navbarIcon, setNavbarIcon] = useState("");
  const location = useLocation();

  // Added: Reference for LoadingBar
  const loadingBarRef = useRef(null);

  useEffect(() => {
    loadingBarRef.current.continuousStart();
    setTimeout(() => {
      loadingBarRef.current.complete();
    }, 1000);

    if (
      location.pathname === "/" ||
      location.pathname === "/my-queries" ||
      location.pathname === "/queries" ||
      location.pathname === "/my-recommendations" ||
      location.pathname === "/recommendations-for-me"
    ) {
      setNavbarBackgroundColor("text-black md:text-white");
      setNavbarIcon("text-white");
    } else {
      setNavbarBackgroundColor("shadow");
      setNavbarIcon("text-black");
    }
  }, [location.pathname]);

  // logout
  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        if (error.message) {
          toast.error("Something wrong");
        }
      });
  };

  //theme functionality
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("light");
    }
  };

  const navLink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-primary text-white font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/queries"
          className={({ isActive }) =>
            isActive ? "bg-primary text-white font-semibold" : ""
          }
        >
          Queries
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/recommendations-for-me"
          className={({ isActive }) =>
            isActive ? "bg-primary text-white font-semibold" : ""
          }
        >
          Recommendations for me
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-queries"
          className={({ isActive }) =>
            isActive ? "bg-primary text-white font-semibold" : ""
          }
        >
          My Queries
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-recommendations"
          className={({ isActive }) =>
            isActive ? "bg-primary text-white font-semibold" : ""
          }
        >
          My recommendations
        </NavLink>
      </li>

      {user || user?.email ? (
        <li onClick={handleSignOut} className="cursor-pointer">
          Logout
        </li>
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}

      {/* Added: Theme Toggle */}
      <li>
        <label className="grid cursor-pointer place-items-center">
          <input
            onChange={handleToggle}
            type="checkbox"
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </li>
    </>
  );

  return (
    <>
      {/* Added: Loading Bar component */}
      <LoadingBar color="#4a00ff" ref={loadingBarRef} style={{ top: "0px" }} />

      <header
        className={`
          ${navbarBackgroundColor} 
          ${
            loading && "text-black shadow"
          } absolute top-0 left-0 right-0 z-50 `}
      >
        <Container>
          <div className="navbar lg:flex justify-between px-0">
            <div>
              <Link to="/">
                <img src={logoImg} alt="logo" className="h-10 md:h-12 " />
              </Link>
            </div>
            <div>
              {/* <!-- large device navbar--> */}
              <div className="navbar-end hidden lg:flex lg:w-full">
                <ul className="menu menu-horizontal items-center gap-3 px-1">
                  {navLink}
                </ul>
              </div>
              {/* <!-- small device navbar--> */}
              <div className="dropdown dropdown-end">
                <div tabIndex="0" role="button" className="lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${navbarIcon} h-7 w-7`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex="0"
                  className="menu menu-sm dropdown-content mt-3 z-[1] px-5 py-2 shadow bg-base-100 rounded-box w-52 space-y-2 text-center"
                >
                  {navLink}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Navbar;
