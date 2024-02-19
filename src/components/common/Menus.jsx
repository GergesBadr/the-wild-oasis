import { createPortal } from "react-dom";
import { createContext, useContext, useRef, useState } from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "../../hooks/useOutsideClick";
import useFocusTrap from "../../hooks/useFocusTrap";
import useCloseWithEsc from "../../hooks/useCloseWithEsc";

const MenusContext = createContext();

function Menus({ children }) {
  const [currOpenedMenuId, setCurrOpenedMenuId] = useState("");
  const [position, setPosition] = useState({ top: 0, right: 0 });

  function openMenu(id) {
    setCurrOpenedMenuId(id);
  }

  function closeMenu() {
    setCurrOpenedMenuId("");
  }

  return (
    <MenusContext.Provider
      value={{ currOpenedMenuId, openMenu, closeMenu, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex items-center justify-end">{children}</div>;
}

function Trigger({ label, id }) {
  const { currOpenedMenuId, openMenu, closeMenu, setPosition } =
    useContext(MenusContext);

  function handleTrigger(e) {
    // If none of the menus is open, or user clicked on a different menu than the current one, then open it.
    // But if the same menu clicked, close it
    currOpenedMenuId === "" || currOpenedMenuId !== id
      ? openMenu(id)
      : closeMenu();
    // Calculate clicked button position, then open the content according to this place,
    // Use getBoundingClientRect method instead of (e.target.clientX or clientY etc)...
    // to ensure consistent behavior whether the click event is triggered by a mouse or keyboard.
    const triggerRect = e.target.getBoundingClientRect();

    const topPosition = triggerRect.bottom + window.scrollY;
    const rightPosition = window.innerWidth - triggerRect.width - triggerRect.x;
    setPosition({ top: topPosition, right: rightPosition });
  }

  return (
    <button
      className="rounded-md bg-transparent p-1 duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      onClick={handleTrigger}
      aria-label={label}
    >
      <HiOutlineEllipsisVertical className="icon-size" />
    </button>
  );
}

function Content({ children, id }) {
  const { currOpenedMenuId, closeMenu, position } = useContext(MenusContext);
  const contentRef = useRef(null);

  // Close menu when clicked outside
  useOutsideClick(contentRef, closeMenu);
  // Close menu when click esc key
  useCloseWithEsc(currOpenedMenuId, closeMenu);
  // Use focus trap
  useFocusTrap(currOpenedMenuId, "menu-content");

  if (currOpenedMenuId !== id) return null;
  return createPortal(
    <div
      id="menu-content"
      ref={contentRef}
      style={{ top: position.top, right: position.right }}
      className="absolute z-10 flex flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-dark-bg"
    >
      {children}
    </div>,
    document.body,
  );
}

function Button({
  icon,
  children,
  onClick,
  disabled,
  ariaLabel,
  extraClasses = "",
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`flex items-center gap-4 px-6 py-3 duration-300 focus:bg-gray-100 dark:focus:bg-gray-900 [&:not(:disabled)]:hover:bg-gray-100 [&:not(:disabled)]:dark:hover:bg-gray-900 ${extraClasses}`}
    >
      {icon}
      <span> {children} </span>
    </button>
  );
}

Menus.Menu = Menu;
Menus.Trigger = Trigger;
Menus.Content = Content;
Menus.Button = Button;

export default Menus;
