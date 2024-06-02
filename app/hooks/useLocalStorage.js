import { useEffect, useState } from "react";

export function useLocalStorage(key, defaultValue) {
  const storedValue =
    typeof window == "undefined" ? null : localStorage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (value === "undefined") {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
