import { useEffect, useRef, MutableRefObject } from "react";

const useOutsideClick = (
  callback: () => void
): MutableRefObject<HTMLElement | null> => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;
