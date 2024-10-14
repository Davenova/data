module.exports = {
  //...
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/index',
      },
    ];
  },
};
