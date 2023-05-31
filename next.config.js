module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'https://nexus-vaults-testnet.playwo.de/api/:slug*',
      },
    ];
  },
};
