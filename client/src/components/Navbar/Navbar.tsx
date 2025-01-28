import React, { useState, MouseEvent } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  //menu closing enable animation
  const [closing, setClosing] = useState(false);
  const closeMenu = (event: MouseEvent) => {
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 1000);
  };
  return (
    <>
      <div className="hidden md:flex ">
        <div className="fixed w-screen h-20 bg-transparent font-oswald uppercase text-white z-40">
          <div className="flex border-b border-white  h-20 mx-8 justify-between items-center">
            <div className="flex">
              <Link to="/">
                <h1 className="text-3xl font-black ">OIF.</h1>
              </Link>
            </div>
            <ul className="flex justify-center gap-10">
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? { borderBottom: "2px solid white" } : undefined
                }
              >
                <li className="text-base hover:scale-105   font-semibold">
                  Home
                </li>
              </NavLink>
              <NavLink
                to="/concerts"
                style={({ isActive }) =>
                  isActive ? { borderBottom: "2px solid white" } : undefined
                }
              >
                <li className="text-base hover:scale-105  font-semibold">
                  CONCERTS
                </li>
              </NavLink>
              <NavLink
                to="/about"
                style={({ isActive }) =>
                  isActive ? { borderBottom: "2px solid white" } : undefined
                }
              >
                <li className="text-base hover:scale-105  font-semibold">
                  ABOUT US
                </li>
              </NavLink>
              <NavLink
                to="/contact"
                style={({ isActive }) =>
                  isActive ? { borderBottom: "2px solid white" } : undefined
                }
              >
                <li className="text-base hover:scale-105  font-semibold">
                  CONTACT US
                </li>
              </NavLink>
            </ul>
            <div className="flex gap-5 items-center justify-center">
              <Button className="text-base bg-transparent">LOGIN</Button>
              <Button className="text-base bg-transparent border rounded-none px-6 py-5">
                REGISTER
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden fixed w-screen h-20 bg-transparent font-oswald uppercase text-white z-40">
        <div className="flex border-b border-white  h-20 mx-8 justify-between items-center">
          <div className="flex">
            <Link to="/">
              <h1 className="text-3xl font-black ">OIF.</h1>
            </Link>
          </div>

          <div className="flex gap-5 items-center justify-center">
            <Button className="text-base bg-transparent">LOGIN</Button>
            <Button className="text-base bg-transparent border rounded-none px-6 py-5">
              REGISTER
            </Button>
          </div>
          <div className="flex">
            <GiHamburgerMenu
              className="text-2xl"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
      </div>
      {menuOpen && (
        <div
          className={`absolute text-white top-0 right-0 flex flex-col bg-slate-950 w-screen h-screen z-50 ${
            closing ? "animate-slideoutright" : "animate-slideinright"
          }   `}
        >
          <div className="flex justify-between items-center h-10 w-full px-10 py-10 border-b border-white ">
            <Link to="/">
              <h1 className="text-3xl font-black ">OIF.</h1>
            </Link>
            <MdClose
              className="text-4xl hover:bg-gray-200 py-1 hover:text-black rounded-full "
              onClick={closeMenu}
            />
          </div>
          <div className="flex  items-center w-full py-20 ">
            <ul className="flex flex-col  px-10 justify-center  gap-10">
              <NavLink
                to="/"
                onClick={closeMenu}
                style={({ isActive }) =>
                  isActive ? { color: "yellow" } : undefined
                }
              >
                <li className="text-base hover:scale-105   font-semibold">
                  HOME
                </li>
              </NavLink>
              <NavLink
                to="/concerts"
                onClick={closeMenu}
                style={({ isActive }) =>
                  isActive ? { color: "yellow" } : undefined
                }
              >
                <li className="text-base hover:scale-105  font-semibold">
                  CONCERTS
                </li>
              </NavLink>
              <NavLink
                to="/about"
                onClick={closeMenu}
                style={({ isActive }) =>
                  isActive ? { color: "yellow" } : undefined
                }
              >
                <li className="text-base hover:scale-105  font-semibold">
                  ABOUT US
                </li>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={closeMenu}
                style={({ isActive }) =>
                  isActive ? { color: "yellow" } : undefined
                }
              >
                <li className="text-base hover:scale-105  font-semibold">
                  CONTACT US
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
