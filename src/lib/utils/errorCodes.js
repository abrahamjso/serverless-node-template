module.exports = {
  // const a = {
  E0001: { statusCode: 'E0001', message: 'Something was worng!' },
  customStatus: (statusCode = null, message = null) => { return { statusCode, message }; },
};
