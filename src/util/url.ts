/**
 * Check whether an URL string is valid
 * @param url URL string to check
 */
function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  }
  catch {
    return false;
  }
}

export default isValidURL;