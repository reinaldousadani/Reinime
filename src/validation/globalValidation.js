export const SPECIAL_CHAR_CHECK = /[^a-zA-Z0-9 ]/;

export const UNIQUE_COLLECTION_CHECK = (collectionName, collections) => {
  if (!collections) return;

  const existingTitles = collections.map((el) => el.title);
  if (existingTitles.indexOf(collectionName) === -1) {
    return false;
  }
  return true;
};
