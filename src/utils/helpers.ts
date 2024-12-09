export const addToLocalStorage = (name: string, item: any) => {
  localStorage.setItem(name, JSON.stringify(item));
};
export const getFromLocalStorage = (name: string) => {
  const item = localStorage.getItem(name);
  return item && JSON.parse(item);
};
