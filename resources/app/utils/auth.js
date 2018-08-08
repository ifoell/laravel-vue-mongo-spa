export const getAccessToken = () => localStorage.getItem('token');
export const setAccessToken = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('token', accessToken);
  } else {
    localStorage.removeItem('token');
  }
};
