import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "../contexts/ThemeContext";

function SwitchTheme() {
  const { theme, handleThemeSwitch } = useTheme();
  const isLightMode = theme === "light";

  return (
    <button
      aria-label={isLightMode ? "apply dark mode" : "apply light mode"}
      title={isLightMode ? "Apply dark mode" : "Apply light mode"}
      onClick={handleThemeSwitch}
      className="rounded-md p-1 duration-300 hover:bg-indigo-50 dark:hover:bg-gray-800"
    >
      {isLightMode ? (
        <HiOutlineMoon className="icon-size text-indigo-600" />
      ) : (
        <HiOutlineSun className="icon-size text-indigo-600" />
      )}
    </button>
  );
}

export default SwitchTheme;
