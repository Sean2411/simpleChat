export function localStorageFactory() {
  try {
    return localStorage;
  } catch (error) {
    console.warn(`Failed to create LocalStorage`, error);
  }
}
