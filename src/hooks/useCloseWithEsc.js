import { useEffect } from "react";

export default function useCloseWithEsc(contentIsOpen, action) {
  useEffect(() => {
    function closeOnEsc(e) {
      if (e.key === "Escape" || e.key === 27) {
        action();
      }
    }

    if (contentIsOpen) {
      document.addEventListener("keydown", closeOnEsc);
    }

    // Cleanup event listener when component unmount, or when modal is NOT open (isOpenModal === false)
    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, [contentIsOpen, action]);
}
