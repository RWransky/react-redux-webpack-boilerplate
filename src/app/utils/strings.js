export const shortenString = (string, len) => {
  if(string && string.length > (len || 8)) {
    return string.substr(0, len || 8) + '...';
  } else {
    return string;
  }
};
