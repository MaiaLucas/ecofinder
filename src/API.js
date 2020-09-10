export default () => {
  return process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_API;
};
