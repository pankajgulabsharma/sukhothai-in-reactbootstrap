//Array validation - pass array in and check for length to be more than 0
export const validateArray = (array) =>
  Array.isArray(array) && array.length > 0;

// validate image
export const validateImage = (image) => image && image?.url;

// validate link
export const validateLink = (link) => link && link?.url;
