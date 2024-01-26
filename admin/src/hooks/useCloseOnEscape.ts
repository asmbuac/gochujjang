import { useEffect } from "react";

const useCloseOnEscape = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
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
