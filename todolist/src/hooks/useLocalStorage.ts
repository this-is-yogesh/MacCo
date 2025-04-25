export default function saveLocalStorage<T>(): [
  (key: string) => T[],
  (key: string, value: T[]) => void
] {
  function saveToStorage(key: string, value: T[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getValueFromLocalStorage(key: string): T[] {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item) as T[];
    }
    return [] as T[];
  }

  return [getValueFromLocalStorage, saveToStorage];
}
