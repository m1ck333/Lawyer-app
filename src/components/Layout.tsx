import  { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useUserAuth from "../hooks/useUserAuth ";
import { DropDownButton, Roles } from "../types";
import DropdownBtn from "./UI/DropdownBtn";
import { useLocation } from "react-router-dom";

const Layout = () => {  
  
  const location = useLocation();
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  

  const { logoutUser, user } = useUserAuth({ enableLocalStorage: true });

  const dropDownButtons: DropDownButton[] = [
    { to: "/profile", label: "My profile" },
    { label: "Logout", onClick: logoutUser },
  ];

  if (user?.role === Roles.admin) {
    dropDownButtons.unshift({ to: "/admin", label: "Admin panel" });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-minor-dark">
        <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/">
            <img className="w-10 h-10" src="/lawyer-logo.svg" alt="" />
          </Link>

          <ul className="flex space-x-4 text-sm font-medium text-main-light">
            <li className="flex items-center">
              <Link to="/"><button className={url === "/" ? 'text-[18px] underline underline-offset-[6px] text-white' : ''}>Home</button></Link>
              <Link to="/calendar"><button className={url === "/calendar" ? 'text-[18px] underline underline-offset-[6px] text-white' : ''}>Calendar</button></Link>
              <Link to="/subjects"><button className={url === "/subjects" ? 'text-[18px] underline underline-offset-[6px] text-white' : ''}>Subjects</button></Link>
            </li>
            <DropdownBtn
              buttonName="Profile"
              dropDownButtons={dropDownButtons}
              needArrowDown={false}
            />
          </ul>
        </nav>
      </header>

      <main className="flex justify-center flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-minor-dark  text-center py-4">
        &copy; 2023 Lawyer App. All rights reserved.
      </footer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Layout;
