import { useEffect } from "react";

const useHideScrollbar = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
};

export default useHideScrollbar;
