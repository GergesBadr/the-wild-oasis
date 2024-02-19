import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./Header";
import Aside from "./Aside";
import useOutsideClick from "../hooks/useOutsideClick";
import FeatureError from "../pages/errors/FeatureError";
import AsideError from "../pages/errors/AsideError";
import HeaderError from "../pages/errors/HeaderError";

function AppLayout() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const onSmallScreens = window.innerWidth < 1024;
  const sidebarRef = useRef();

  useEffect(() => {
    function updateSidebarApperance() {
      setIsOpenSidebar(!onSmallScreens);
    }
    updateSidebarApperance();
    window.addEventListener("resize", updateSidebarApperance);
    return () => {
      window.removeEventListener("resize", updateSidebarApperance);
    };
  }, [onSmallScreens]);

  useOutsideClick(sidebarRef, () => {
    if (onSmallScreens && isOpenSidebar) {
      setIsOpenSidebar(false);
    }
  });

  return (
    <div className="grid min-h-dvh grid-cols-[auto,1fr] grid-rows-[auto,1fr]">
      {/* Skip navigation link => for accessibility */}
      <a
        href="#main-content"
        className="absolute -top-96 left-0 z-50 m-2 p-2 font-bold tracking-wider text-indigo-600 duration-200 focus:top-0 dark:text-gray-200"
      >
        Skip to main content
      </a>

      <header className="col-end-[-1] border-b border-b-gray-200 bg-white px-6 py-4 dark:border-b-gray-700 dark:bg-dark-bg">
        {/* Handling errors => specific for header */}
        <ErrorBoundary
          FallbackComponent={HeaderError}
          onReset={() => window.location.replace("/")}
        >
          <Header setIsOpenSidebar={setIsOpenSidebar} />
        </ErrorBoundary>
      </header>

      <aside
        ref={sidebarRef}
        aria-hidden={!isOpenSidebar}
        className={`fixed z-10 h-full min-w-[300px] border-r border-r-gray-200 bg-white px-4 py-10 shadow-2xl duration-300 lg:relative lg:row-start-1 lg:row-end-[-1] lg:shadow-none dark:border-r-gray-700 dark:bg-dark-bg
        ${isOpenSidebar ? "translate-x-0" : "-translate-x-[100%]"}`}
      >
        {/* Handling errors => specific for aside */}
        <ErrorBoundary
          FallbackComponent={AsideError}
          onReset={() => window.location.replace("/")}
        >
          <Aside
            isOpenSidebar={isOpenSidebar}
            setIsOpenSidebar={setIsOpenSidebar}
          />
        </ErrorBoundary>
      </aside>

      <main
        id="main-content"
        className="col-start-1 col-end-[-1] row-start-2 overflow-hidden bg-gray-50 px-8 py-6 md:col-start-2 md:px-12 md:py-8 xl:px-24 dark:bg-gray-900 "
      >
        <div className="w-full space-y-8 ">
          {/* Handling errors => In features */}
          <ErrorBoundary
            FallbackComponent={FeatureError}
            onReset={() => window.location.replace("/")}
          >
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
