import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialData) => {
  const [data, setData] = useState(initialData);

  const localData = JSON.parse(localStorage.getItem(key));
  useEffect(() => {
    if (localData) {
      setData(localData);
      return;
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);

  const updateLocalStorage = (newData) => {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }
    setData(newData);
  };
  return [data, updateLocalStorage];
};
