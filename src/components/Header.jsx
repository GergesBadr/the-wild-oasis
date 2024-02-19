import { HiOutlineUser, HiOutlineBars3 } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import SwitchTheme from "./SwitchTheme";
import User from "../features/authentication/User";

function Header({ setIsOpenSidebar }) {
  return (
    <nav className="flex items-center justify-between lg:justify-end">
      <button
        aria-label="Show and hide aside menu"
        onClick={() => setIsOpenSidebar((pre) => !pre)}
        className="block rounded-md px-1 duration-300 hover:bg-indigo-50 lg:hidden dark:hover:bg-gray-800"
      >
        <HiOutlineBars3 className="h-8 w-8" />
      </button>
      <div className="flex items-center gap-4">
        <User />
        <div className="flex items-center gap-2">
          <NavLink
            aria-label="account"
            title="Account"
            to="/account"
            className={({ isActive }) =>
              `rounded-md p-1 duration-300 hover:bg-indigo-50 dark:hover:bg-gray-800 ${
                isActive ? "bg-indigo-50 dark:bg-gray-900" : ""
              }`
            }
          >
            <HiOutlineUser className="icon-size text-indigo-600" />
          </NavLink>
          <SwitchTheme />
          <Logout />
        </div>
      </div>
    </nav>
  );
}

export default Header;
