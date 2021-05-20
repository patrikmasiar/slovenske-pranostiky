import express, {
  Request,
  Response,
} from 'express';
import data from '../data.json';

const router = express.Router();

const SUPPORTED_MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12];

router.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    error: null,
    data: data,
  }).end();
});

router.get('/:month', async (req: Request, res: Response) => {
  const month = Number.parseInt(req.params.month);

  if (isNaN(month) || !SUPPORTED_MONTHS.includes(month)) {
    return res.status(400).json({
      error: {
        message: 'Not supported month value',
      },
      data: null,
    }).end();
  }

  res.status(200).json({
    error: null,
    data: data[month - 1],
  }).end();
});

router.get('/:month/?:day', async (req: Request, res: Response) => {
  const month = Number.parseInt(req.params.month);
  const day = Number.parseInt(req.params.day);

  if (isNaN(month) || !SUPPORTED_MONTHS.includes(month)) {
    return res.status(400).json({
      error: {
        message: 'Not supported month value',
      },
      data: null,
    }).end();
  }

  if (isNaN(day)) {
    return res.status(400).json({
      error: {
        message: 'Not supported day value',
      },
      data: null,
    }).end();
  }

  res.status(200).json({
    error: null,
    data: data[month - 1][day],
  }).end();
});

export default router;
