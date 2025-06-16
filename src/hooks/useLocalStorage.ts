import { useState } from 'react';

export function useLocalStorage<Type>(key: string, initialValue: Type) {
  // Get from local storage or return initialValue if it's not there
  const readValue = () => {
    const item = window.localStorage.getItem(key);
    if (!item) {
        return initialValue;
    }
    return JSON.parse(item);
  };

  const [storedValue, setStoredValue] = useState<Type>(readValue);

  // Update both state and save to localStorage
  const setValue = (newValue: Type) => {
    setStoredValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [storedValue, setValue] as const;
} 