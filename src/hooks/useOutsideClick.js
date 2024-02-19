import { useEffect } from "react";

function useOutsideClick(elementRef, handleOutsideClick) {
  useEffect(() => {
    function detectOusideClick(e) {
      // If provided element ref excist, AND it's NOT the clicked element, do what you want
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        handleOutsideClick && handleOutsideClick();
      }
    }

    document.addEventListener("click", detectOusideClick, true);
    // If the component which use this custom hook unmounts, don't listen to clicks on the document
    return () => document.removeEventListener("click", detectOusideClick, true);
  }, [elementRef, handleOutsideClick]);
}

export default useOutsideClick;