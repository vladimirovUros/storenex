import { RefObject } from "react";
export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null>) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; //Width of dropdown (w-60 in Tailwind = 15rem 240px)

    //Calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    //Check if dropdown would go off the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      //Align to the right edge of the button instead
      left = rect.right - dropdownWidth + window.scrollX;

      //If it still goes off-screen, align to the right edge of the viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16; // 16px padding
      }
    }
    //Ensure dropdown doesn't go off left edge of the viewport
    if (left < 0) {
      left = 16; // 16px padding
    }
    return {
      top,
      left,
    };
  };
  return {
    getDropdownPosition,
  };
};
