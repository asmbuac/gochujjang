import { useEffect } from "react";

const useCloseOnEscape = (setOpen) => {
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [setOpen]);
};

export default useCloseOnEscape;
