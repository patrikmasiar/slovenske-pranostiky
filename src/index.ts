import express from 'express';
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
    app.listen(process.env.PORT || 3010, () => {
      console.log(`Server started at http://localhost:${ process.env.PORT || 3010 }`);
    });
  } catch (error) {
    console.error({ message: `Unable to start server on port ${process.env.PORT || 3010}` });
    process.exit(1);
  }
}

start();