import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";

function Logout() {
  const { isPending, logout } = useLogout();

  return (
    <button
      aria-label="logout"
      title="Logout"
      disabled={isPending}
      onClick={logout}
      className="rounded-md p-1 duration-300 hover:bg-indigo-50 dark:hover:bg-gray-800"
    >
      <HiOutlineArrowRightOnRectangle className="icon-size text-indigo-600" />
    </button>
  );
}

export default Logout;
