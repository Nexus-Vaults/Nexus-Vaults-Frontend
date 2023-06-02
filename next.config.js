module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'https://nexus-vaults.playwo.de/api/:slug*',
      },
    ];
  },
};
