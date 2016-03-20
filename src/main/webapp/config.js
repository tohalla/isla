export default {
  api: {
    host: document.domain,
    port: process.env.NODE_ENV === 'production' ? 8080 : 3000
  }
};
