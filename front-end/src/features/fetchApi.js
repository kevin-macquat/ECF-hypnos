export function fetchApi(url, ...otherParams) {
  const baseUrl = 'https://kevin-macquat-ecf2.herokuapp.com/api/';
  // const baseUrl = 'http://ecf.local/api/';
  return fetch(`${baseUrl}${url}`, ...otherParams);
}