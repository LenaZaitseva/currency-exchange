export const setToLocalStorage = (key: string, value: any) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error: any) {
    console.error("Set state error: ", error.message);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error: any) {
    console.error("Get state error: ", error.message);
  }
};
