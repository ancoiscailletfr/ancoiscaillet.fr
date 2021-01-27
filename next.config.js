const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) =>
  withPWA({
    pwa: {
      disable: phase === PHASE_DEVELOPMENT_SERVER,
      dest: 'public',
      runtimeCaching
    }
  })
