export default {
  api: {
    host: 'localhost',
    port: process.env.NODE_ENV === 'production' ? 8080 : 3000
  }
};
