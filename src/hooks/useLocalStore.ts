import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserTokenPayload } from 'types/MainType';
function useLocalStore(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getItemLocalStore(key, initialValue);
  });

  useEffect(() => {
    setItemLocalStore(key, value);
  }, [key, value]);

  return [value, setValue];
}

export function getItemLocalStore(key, defaultValue = null) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

export function setItemLocalStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getDataFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded as UserTokenPayload;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

export default useLocalStore;
