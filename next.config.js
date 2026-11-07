const withMDX = require('@next/mdx')();
module.exports = withMDX({ output: 'export', experimental: { globalNotFound: true } });
