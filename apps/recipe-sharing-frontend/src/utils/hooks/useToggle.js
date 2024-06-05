import { useState } from "react";

export function useToggle() {
  const [on, setOn] = useState(false);
  function toggle() {
    setOn((prev) => !prev);
  }
  return [on, toggle];
}
