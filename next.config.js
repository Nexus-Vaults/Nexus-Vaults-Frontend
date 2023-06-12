const { env } = require('process');

module.exports = {
  async rewrites() {
    if (env.REACT_APP_NODE_ENV == 'production') {
      return [];
    }

    return [
      {
        source: '/api/:slug*',
        destination: env.NEXT_PUBLIC_TESTNET
          ? 'http://127.0.0.1:4565/api/:slug*'
          : 'https://nexus-vaults.playwo.de/api/:slug*',
      },
    ];
  },
};
