import { useEffect, useRef } from "react";

const useCheckOutsideClick = (setOpen) => {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside, true);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [setOpen]);

  return ref;
};

export default useCheckOutsideClick;
