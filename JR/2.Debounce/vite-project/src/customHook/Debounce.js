import { useState } from "react";

function useDebounce(callBack, delay) {
  const [debounced] = useState(() => {
    let timeOut = null;
    return function (...args) {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        callBack(args);
      }, delay);
    };
  });
  return debounced
}

export default useDebounce;
