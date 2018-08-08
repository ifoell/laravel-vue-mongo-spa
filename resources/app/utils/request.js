export default function request(url, options) {
  const defaultOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  const requestOptions = Object.assign({}, defaultOptions, options);
  return fetch(url, requestOptions);
}
