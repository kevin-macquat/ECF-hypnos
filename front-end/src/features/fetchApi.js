export function fetchApi(url, ...otherParams) {
  const baseUrl = 'https://kevin-macquat-ecf.herokuapp.com/api/';
  return fetch(`${baseUrl}${url}`, ...otherParams);
}