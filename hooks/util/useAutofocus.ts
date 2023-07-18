import type { InputRef } from "antd";
import { useEffect, useRef } from "react";

const useAutofocus = () => {
  const autoFocusRef = useRef<InputRef>(null);
  useEffect(() => {
    if (autoFocusRef) {
      autoFocusRef.current!.focus({
        preventScroll: true,
        cursor: "all",
      });
    }
  }, [autoFocusRef]);
  return autoFocusRef;
};

export default useAutofocus;
