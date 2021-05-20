import express from 'express';
import config from './config';
import routes from './routes';

const app = express();

app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    error: {
      message: 'Something went wrong.',
    },
    data: null,
  });
})
app.use(routes);

async function start(): Promise<void> {
  try {
    app.listen(config.port, () => {
      console.log(`Server started at http://localhost:${ config.port }`);
    });
  } catch (error) {
    console.error({ message: `Unable to start server on port ${config.port}` });
    process.exit(1);
  }
}

start();