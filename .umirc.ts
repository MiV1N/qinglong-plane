import { defineConfig } from '@umijs/max';
const CompressionPlugin = require('compression-webpack-plugin');

const baseUrl = process.env.QlBaseUrl || '/';
export default defineConfig({
  hash: true,
  jsMinifier: 'terser',
  antd: {},
  locale: {
    antd: true,
    title: true,
    baseNavigator: true,
  },
  outputPath: 'static/dist',
  fastRefresh: true,
  favicons: [`static/favicon.svg`],
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  proxy: {
    [`${baseUrl}api/update`]: {
      target: 'http://127.0.0.1:5300/',
      changeOrigin: true,
      pathRewrite: { [`^${baseUrl}api/update`]: '/api' },
    },
    [`${baseUrl}api/public`]: {
      target: 'http://127.0.0.1:5400/',
      changeOrigin: true,
      pathRewrite: { [`^${baseUrl}api/public`]: '/api' },
    },
    [`${baseUrl}api`]: {
      target: 'http://127.0.0.1:5600/',
      changeOrigin: true,
      ws: true,
      pathRewrite: { [`^${baseUrl}api`]: '/api' },
    },
  },
  chainWebpack: ((config: any) => {
    config.plugin('compression-webpack-plugin').use(
      new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.6,
      }),
    );
  }) as any,
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  headScripts: [
    `./api/env.js`,
    `./static/react.production.min.js`, 
    `./static/react-dom.production.min.js`, 
  ],
  copy: [
    {
      from: 'node_modules/monaco-editor/min/vs',
      to: 'static/dist/monaco-editor/min/vs',
    },
    {
      from: './src/assets/static/react.production.min.js', // 将 React 脚本的本地路径更新到这里
      to: 'static/react.production.min.js',
    },
    {
      from: './src/assets/static/react-dom.production.min.js', // 将 ReactDOM 脚本的本地路径更新到这里
      to: 'static/react-dom.production.min.js',
    },
    {
      from: './src/assets/static/favicon.svg', // 将 ReactDOM 脚本的本地路径更新到这里
      to: 'static/favicon.svg',
    },
    
  ],
});
