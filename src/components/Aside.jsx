import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlineXMark,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import Logo from "./common/Logo";

function Aside({ isOpenSidebar, setIsOpenSidebar }) {
  const links = [
    {
      name: "Home",
      to: "/dashboard",
      icon: <HiOutlineHome className="icon-size text-gray-400 duration-300 " />,
    },
    {
      name: "Bookings",
      to: "/bookings",
      icon: (
        <HiOutlineCalendarDays className="icon-size text-gray-400 duration-300 " />
      ),
    },
    {
      name: "Cabins",
      to: "/cabins",
      icon: (
        <HiOutlineHomeModern className="icon-size text-gray-400 duration-300 " />
      ),
    },
    {
      name: "Users",
      to: "/users",
      icon: (
        <HiOutlineUsers className="icon-size text-gray-400 duration-300 " />
      ),
    },
    {
      name: "Guests",
      to: "/guests",
      icon: (
        <HiOutlineBriefcase className="icon-size text-gray-400 duration-300 " />
      ),
    },
    {
      name: "Settings",
      to: "/settings",
      icon: (
        <HiOutlineCog6Tooth className="icon-size text-gray-400 duration-300 " />
      ),
    },
  ];

  return (
    <nav aria-label="Side navigation">
      <button
        aria-label="close aside"
        aria-pressed={isOpenSidebar}
        tabIndex={!isOpenSidebar ? -1 : null}
        onClick={() => setIsOpenSidebar((pre) => !pre)}
        className="absolute right-4 top-4 block rounded-lg p-1 duration-200 hover:bg-indigo-50 lg:hidden hover:dark:bg-gray-800"
      >
        <HiOutlineXMark className="icon-size" />
      </button>

      <Logo />

      <ul className="mt-8 space-y-2">
        {links.map((link) => {
          return (
            <li key={link.to}>
              <NavLink
                tabIndex={!isOpenSidebar ? -1 : null}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-md px-6 py-3 font-medium duration-300 hover:bg-indigo-50 hover:dark:bg-gray-900 [&>svg]:hover:text-indigo-600 ${
                    isActive
                      ? "bg-indigo-50 dark:bg-gray-900 [&>svg]:text-indigo-600"
                      : ""
                  }`
                }
              >
                {/* It's a decorative, non-essential icon. no need for alt text or any a11y method here */}
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Aside;
