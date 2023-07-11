import { Link, Outlet } from "react-router-dom";
import useUserAuth from "../hooks/useUserAuth ";

const Layout = () => {
  const { logoutUser } = useUserAuth({enableLocalStorage: true});

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-minor-dark">
        <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/">
            <img className="w-10 h-10" src="/lawyer-logo.svg" alt="" />
          </Link>

          <ul className="flex space-x-4">
            <li className="flex items-center">
              <Link to="/">Home</Link>
            </li>

            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex justify-center flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-minor-dark  text-center py-4">
        &copy; 2023 Lawyer App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;