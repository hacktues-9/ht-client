import { useEffect } from "react";

export const useOutsideAlerter = (ref: any, buttonRef: any, callback: any) => {
  // create a function that closes the dropdown if the user clicks outside of it, but and on the button, without reopning it
  const handleClickOutside = (event: any) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      callback();
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return { handleClickOutside };
};
