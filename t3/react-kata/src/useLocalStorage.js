import { useState, useEffect } from 'react';

/**
 * Persists a piece of state to localStorage and keeps it in sync.
 * Each call creates its own independent state (just like useState).
 *
 * @param {string} key          localStorage key
 * @param {any}    initialValue fallback when nothing is stored yet
 * @returns {[any, Function]}   [value, setValue] — setValue supports functional updates
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`useLocalStorage: could not read "${key}"`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: could not write "${key}"`, err);
    }
  }, [key, value]);

  // Demo aid: shows each call has its own state slot. Remove in production.
  console.log(`useLocalStorage("${key}") ->`, value);

  return [value, setValue];
}