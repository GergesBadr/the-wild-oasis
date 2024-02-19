import { useTheme } from "../../contexts/ThemeContext";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

function Logo({ size = "w-44" }) {
  const { theme } = useTheme();

  return (
    <img
      src={theme === "light" ? logoLight : logoDark}
      alt="The wild oasis hotel with high green mountain background"
      className={`mx-auto ${size}`}
    />
  );
}

export default Logo;
