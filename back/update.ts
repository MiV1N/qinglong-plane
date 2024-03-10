import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await require('./loaders/update').default({ app });

  app
    .listen(config.updatePort, () => {
      Logger.debug(`✌️ 更新服务启动成功！`);
      console.debug(`✌️ 更新服务启动成功！`);
      process.send?.('ready');
    })
    .on('error', (err) => {
      Logger.error(err);
      console.error(err);
      process.exit(1);
    });
}

startServer();
