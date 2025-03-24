export const getShortObjectID = (id: string) => {
  return id?.substring(0, 8).toUpperCase();
};
