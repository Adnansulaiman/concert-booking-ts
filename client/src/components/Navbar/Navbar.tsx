import React, { useState, MouseEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
const Navbar = () => {
  const { loggedIn, logout,userData } = useAuth();
  console.log(userData);
  // console.log(loggedIn);
  const navigate = useNavigate();
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

  const handleLogout =(e:MouseEvent) =>{
    logout()
    navigate('/')
    if(e) closeMenu(e)
  }
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
            {!loggedIn ? (
              <div className="flex gap-5 items-center justify-center">
                <Link to="/login">
                  <Button className="text-base bg-transparent">LOGIN</Button>
                </Link>
                <Link to="/register">
                  <Button className="text-base bg-transparent border  px-8 py-5 rounded-full">
                    REGISTER
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-4">
                {userData && <p>{userData.name}</p>}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                    
                      src={userData?.image ? userData?.image : "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" }
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-5 mt-2 ">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <AlertDialog>
                        <AlertDialogTrigger className="text-sm px-3 text-red-500">Logout</AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              logout your account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500"  onClick={()=>{logout();navigate('/')}}>
                              Logout
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
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
          {!loggedIn && (
            <div className="flex gap-5 items-center justify-center">
              <Link to="/login">
                <Button className="text-base bg-transparent">LOGIN</Button>
              </Link>
              <Link to="/register">
                <Button className="text-base bg-transparent border rounded-full px-8 py-5">
                  REGISTER
                </Button>
              </Link>
            </div>
          )}

          <div className="flex">
            <GiHamburgerMenu
              className="text-2xl"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>

        {menuOpen && (
          <div
            className={`absolute text-white top-0 right-0 flex flex-col  bg-[#0b0b0b] w-screen h-screen z-50 ${
              closing ? "animate-slideoutright" : "animate-slideinright"
            }   `}
          >
            <div className="flex justify-between items-center h-10 w-full px-10 py-10 border-b border-white ">
              <Link to="/">
                <h1 className="text-3xl font-black ">OIF.</h1>
              </Link>
              {loggedIn && (
                <div className="flex gap-4">
                <p>Adam</p>
                <img
                  src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
              </div>
              )}
              
              <MdClose
                className="text-4xl hover:bg-gray-200 py-1 hover:text-black rounded-full "
                onClick={closeMenu}
              />
            </div>

            <div className="flex  items-center w-full py-20 ">
              <ul className="flex flex-col  px-10 justify-center  items-center w-full gap-10">
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
            {loggedIn && (
              <div className="flex flex-col  py-20 px-10">
                  <AlertDialog>
                        <AlertDialogTrigger className="font-semibold" >LOGOUT</AlertDialogTrigger>
                        <AlertDialogContent className="">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              logout your account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500"  onClick={(e)=>{
                              logout()
                              navigate('/')
                              closeMenu(e)
                            }}>
                              Logout
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
            </div>
            )}
            
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
