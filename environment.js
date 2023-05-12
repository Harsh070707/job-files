module.exports = {
  development: {
    port: 3002,

    mongoUri:
      'mongodb+srv://root:root@cluster0.htlgenf.mongodb.net/blog?retryWrites=true&w=majority',

    logs: 'dev',
  },

  staging: {
    port: 3002,

    mongoUri: '',

    logs: 'dev',
  },

  production: {
    port: 4010,
    mongoUri: '',
    logs: 'combined',
  },

  test: {
    port: 4010,
    mongoUri: '',
    logs: 'dev',
  },
};
