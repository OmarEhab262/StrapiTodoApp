import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const onLogout = () => {
    localStorage.removeItem(storageKey);
    toast.success("Yor logged out 🥲", {
      position: "bottom-center",
      duration: 1500,
      style: {
        backgroundColor: "black",
        color: "white",
        width: "fit-content",
      },
    });
    setTimeout(() => {
      location.replace(pathname);
    }, 1500);
  };

  return (
    <nav className="  mb-20 px-3 py-5 bg-white">
      <ul className="flex items-center justify-between">
        <li className="text-black duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>

        {userData ? (
          <div className="flex items-center text-black  space-x-4">
            <li className="duration-200 text-lg">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li className="duration-200 text-lg">
              <NavLink to="/todos">Todos</NavLink>
            </li>
            <button
              className="bg-indigo-500 text-white p-2 rounded-md cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center text-black  space-x-4">
            <li className="duration-200 text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="duration-200 text-lg">
              <NavLink to="/login">Login</NavLink>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
